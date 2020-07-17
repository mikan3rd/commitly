import React from "react";
import { Button, Icon } from "semantic-ui-react";

import { useUser } from "../../context/userContext";

export const TwitterConnectButton: React.FC = () => {
  const { twitterUserData, twitterConnect } = useUser();
  return (
    <Button color="twitter" size="big" onClick={() => twitterConnect()} disabled={!!twitterUserData}>
      <Icon name="twitter" />
      {twitterUserData ? "Twitter連携中" : "Twitter連携"}
    </Button>
  );
};
