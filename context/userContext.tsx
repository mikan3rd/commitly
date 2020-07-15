import React from "react";
import Router from "next/router";
import { toast } from "react-semantic-toasts";

import firebase from "../utils/clientApp";
import { User } from "../models/User";

type GithubCredentialType = {
  credential: { accessToken: string };
  additionalUserInfo: { username: string; isNewUser: boolean; profile: { id: number } };
  user: { uid: string };
};

type TwitterCredentialType = {
  credential: { accessToken: string; secret: string };
  additionalUserInfo: { username: string; isNewUser: boolean; profile: { id_str: string } };
  user: { uid: string };
};

type UserContextType = {
  user: firebase.User | null;
  userDoc: User | null;
  loadingUser: boolean;
  login: () => void;
  logout: () => void;
};

export const UserContext = React.createContext<UserContextType>(undefined);

export default function UserContextComp({ children }) {
  const [user, setUser] = React.useState<firebase.User | null>(null);
  const [loadingUser, setLoadingUser] = React.useState(true);
  const [userDoc, setUserDoc] = React.useState<User | null>(null);

  const getUserDoc = async (uid: string) => {
    const doc = await firebase.firestore().collection("users").doc(uid).get();
    const params = doc.data() as { [field: string]: unknown };
    return new User(params);
  };

  const reloadUserDoc = async (uid: string) => {
    const userDoc = await getUserDoc(uid);
    setUserDoc(userDoc);
  };

  const updateFirestoreUserDoc = async (uid: string, userDoc: User) => {
    await firebase.firestore().collection("users").doc(uid).set(userDoc.getFirestoreObject(), { merge: true });
  };

  const setCurrentUser = async () => {
    setLoadingUser(true);
    firebase.auth().onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await reloadUserDoc(currentUser.uid);
      }
      setLoadingUser(false);
    });
  };

  const login = async () => {
    const provider = new firebase.auth.GithubAuthProvider();
    provider.addScope("read:user");

    const userCredential: unknown = await firebase.auth().signInWithPopup(provider);

    // フルスクリーンの場合はポップアップで新規タブを開いてネットワークがオフラインになるため必要
    await firebase.firestore().enableNetwork();

    const {
      credential: { accessToken },
      additionalUserInfo: {
        username,
        profile: { id },
      },
      user: { uid },
    } = userCredential as GithubCredentialType;

    const userDoc = await getUserDoc(uid);
    const nextUserDoc = userDoc.setGithub({ username, userId: String(id), accessToken });
    await updateFirestoreUserDoc(uid, nextUserDoc);
    await setCurrentUser();

    await Router.push("/setting");

    setTimeout(() => {
      toast({
        type: "success",
        title: "ログインしました！",
      });
    }, 500);
  };

  const logout = async () => {
    await firebase.auth().signOut();

    setUser(null);
    setUserDoc(null);

    await Router.push("/");

    setTimeout(() => {
      toast({
        type: "success",
        title: "ログアウトしました！",
      });
    }, 500);
  };

  React.useEffect(() => {
    setCurrentUser();
  }, []);

  return <UserContext.Provider value={{ user, userDoc, loadingUser, login, logout }}>{children}</UserContext.Provider>;
}

// Custom hook that shorhands the context!
export const useUser = () => React.useContext(UserContext);
