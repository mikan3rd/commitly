import React from "react";
import { css } from "@emotion/core";
import { Button, Container, Segment } from "semantic-ui-react";

export const Footer: React.FC = () => {
  return (
    <Segment
      color="grey"
      inverted
      attached="bottom"
      css={css`
        &&& {
          padding: 1em;
        }
      `}
    >
      <Container>
        <div css={ButtonCss}>
          <Button
            circular
            color="twitter"
            icon="twitter"
            size="small"
            as="a"
            href="https://twitter.com/commitly_jp"
            target="_blank"
            rel="noopener noreferrer"
          />
        </div>
        <div css={ButtonCss}>
          <Button
            circular
            color="black"
            icon="github"
            size="small"
            as="a"
            href="https://github.com/mikan3rd/commitly"
            target="_blank"
            rel="noopener noreferrer"
          />
        </div>
      </Container>
    </Segment>
  );
};

const ButtonCss = css`
  display: inline;
  margin-right: 15px;
`;
