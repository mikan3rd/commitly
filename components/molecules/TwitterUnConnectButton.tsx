import React from "react";
import { Button, Icon } from "semantic-ui-react";

import { useUser } from "../../context/userContext";

export const TwitterUnConnectButton: React.FC = () => {
  const { twitterUserData, twitterUnconnect } = useUser();

  if (!twitterUserData) {
    return null;
  }

  return (
    <Button color="red" size="big" onClick={() => twitterUnconnect()}>
      <Icon name="twitter" />
      Twitter連携解除
    </Button>
  );
};
