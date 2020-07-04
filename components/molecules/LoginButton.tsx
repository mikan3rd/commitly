import React from "react";
import { Button, Icon } from "semantic-ui-react";

export const LoginButton: React.FC = () => {
  return (
    <Button color="black" size="big">
      <Icon name="github" />
      GitHubログイン
    </Button>
  );
};
