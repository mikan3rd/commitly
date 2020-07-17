import React from "react";
import { Button, Dropdown, Header, Icon, Segment } from "semantic-ui-react";
import { css } from "@emotion/core";

import { TwitterConnectButton } from "../molecules/TwitterConnectButton";
import { TwitterUnConnectButton } from "../molecules/TwitterUnConnectButton";
import { useUser } from "../../context/userContext";

const tweetTimeOptions = Array.from(Array(24).keys()).map((i) => {
  const text = `${i + 1}:00`;
  let value = i + 1;
  if (value === 24) {
    value = 0;
  }
  return { text, value };
});

export const Setting: React.FC = () => {
  const { userDoc, twitterUserData, changeTweetTime } = useUser();
  const tweetTime = userDoc?.setting.tweetTime;
  console.log(tweetTime);
  return (
    <>
      <Segment vertical>
        <Header as="h1">設定</Header>
      </Segment>

      <Segment vertical>
        <Header as="h2">
          <Icon name="github" />
          <Header.Content>GitHub</Header.Content>
        </Header>

        <p>
          コミットを計測するには<strong>GitHub App</strong>のインストールが必要です
          <br />
          次のページから計測したいリポジトリにアクセス権限（読み取り専用）を付与してください
        </p>
        <Button
          as="a"
          color="black"
          href="https://github.com/apps/commitly"
          target="_blank"
          rel="noopener noreferrer"
          size="big"
        >
          <Icon name="github" />
          GitHub App
        </Button>
      </Segment>

      <Segment vertical>
        <Header as="h2">
          <Icon name="twitter" />
          <Header.Content>Twitter</Header.Content>
        </Header>
        <p>定期ツイートするためにはTwitter連携が必要です</p>
        <TwitterConnectButton />

        <div
          css={css`
            margin-top: 10px;
          `}
        >
          <TwitterUnConnectButton />
        </div>

        <Header as="h3" content="定期ツイート時刻" />
        <Dropdown
          value={tweetTime}
          options={tweetTimeOptions}
          selection
          disabled={!twitterUserData}
          onChange={(e, d) => changeTweetTime(d.value as number)}
        />
      </Segment>
    </>
  );
};
