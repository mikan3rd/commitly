import React from "react";
import { Button, Icon } from "semantic-ui-react";

import { useUser } from "../../context/userContext";

export const LoginButton: React.FC = () => {
  const { user, login } = useUser();
  return (
    <Button color="black" size="big" onClick={() => login()} disabled={!!user}>
      <Icon name="github" />
      {user ? "GitHubログイン中" : "GitHubログイン"}
    </Button>
  );
};
