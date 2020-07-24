import React from "react";
import Router from "next/router";

import { useUser } from "../../context/userContext";

export const LoginOnly: React.FC = ({ children }) => {
  const { userDoc, loadingUser } = useUser();

  React.useEffect(() => {
    if (!loadingUser && !userDoc) {
      Router.push("/");
    }
  }, [loadingUser, userDoc]);

  if (!userDoc) {
    return null;
  }

  return <>{children}</>;
};
