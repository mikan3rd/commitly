import React from "react";

import firebase from "../utils/clientApp";

type UserContextType = {
  user: firebase.User | null;
  loadingUser: boolean;
};

export const UserContext = React.createContext<UserContextType>(undefined);

export default function UserContextComp({ children }) {
  const [user, setUser] = React.useState<firebase.User | null>(null);
  const [loadingUser, setLoadingUser] = React.useState(true); // Helpful, to update the UI accordingly.

  React.useEffect(() => {
    const unsubscriber = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoadingUser(false);
    });
    return () => unsubscriber();
  }, []);

  return <UserContext.Provider value={{ user, loadingUser }}>{children}</UserContext.Provider>;
}

// Custom hook that shorhands the context!
export const useUser = () => React.useContext(UserContext);
