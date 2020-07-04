import React from "react";
import { css } from "@emotion/core";
import { Grid, Header, Image, Label, Segment } from "semantic-ui-react";

import { LoginButton } from "../molecules/LoginButton";

export const Index: React.FC = () => {
  return (
    <>
      <Segment vertical>
        <Image src="/logo.png" />
      </Segment>

      <Segment vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width="8">
              <Header>あなたのコミットを共有しませんか？</Header>
              <p>Commitlyはあなたの書いたコードをプログラミング言語別に集計してシェアするためのサービスです</p>
            </Grid.Column>
            <Grid.Column width="8">
              <a
                className="twitter-timeline"
                data-height="400"
                href="https://twitter.com/commitly_jp"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tweets by commitly_jp
              </a>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment vertical textAlign="center" padded="very">
        <Header>あなたのコミットもシェアしよう！</Header>
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          <LoginButton />
          <Label pointing="left" size="big" color="blue">
            Join Now!!
          </Label>
        </div>
      </Segment>
    </>
  );
};
