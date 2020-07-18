import React from "react";
import { Header, Icon, Label, Segment } from "semantic-ui-react";
import { css } from "@emotion/core";

import { ProfileData } from "../../models/ProfileData";

export const Profile: React.FC<{
  username: string;
  profileData: ProfileData;
}> = ({ username, profileData }) => {
  const { commits } = profileData;

  return (
    <>
      <Segment vertical>
        <Header as="h1">
          <Icon name="github" />
          <Header.Content>{username}</Header.Content>
        </Header>
      </Segment>

      <Segment vertical>
        {commits.map((commit, index) => {
          const { date, totalCommits } = commit;
          return (
            <div
              key={index}
              css={css`
                position: relative;
                padding: 10px;
                border: 1px solid #22242626;
                border-radius: 5px;
                margin-bottom: 10px;
                background-color: #fff;
              `}
            >
              <Label attached="top">{date.format("YYYY年M月D日(ddd)")}</Label>
              <div
                css={css`
                  display: flex;
                  align-items: baseline;
                `}
              >
                合計
                <div
                  css={css`
                    font-weight: bold;
                    font-size: 24px;
                    margin: 0 5px;
                  `}
                >
                  {totalCommits}
                </div>
                行のコードを書きました！
              </div>
              {commit.sortedExtensions().map((extention, extentionIndex) => {
                const { name, lineNum } = extention;
                return (
                  <div key={extentionIndex}>
                    {name}: {lineNum}
                  </div>
                );
              })}
            </div>
          );
        })}
      </Segment>
    </>
  );
};
