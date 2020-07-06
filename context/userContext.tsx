import React from "react";

import firebase from "../utils/clientApp";

export const UserContext = React.createContext({});

export default function UserContextComp({ children }) {
  const [user, setUser] = React.useState<firebase.User | null>(null);
  const [loadingUser, setLoadingUser] = React.useState(true); // Helpful, to update the UI accordingly.

  React.useEffect(() => {
    // Listen authenticated user
    const unsubscriber = firebase.auth().onAuthStateChanged(async (user) => {
      try {
        if (user) {
          setUser(user);
        } else setUser(null);
      } catch (error) {
        // Most probably a connection error. Handle appropriately.
      } finally {
        setLoadingUser(false);
      }
    });

    // Unsubscribe auth listener on unmount
    return () => unsubscriber();
  }, []);

  return <UserContext.Provider value={{ user, setUser, loadingUser }}>{children}</UserContext.Provider>;
}

// Custom hook that shorhands the context!
export const useUser = () => React.useContext(UserContext);
