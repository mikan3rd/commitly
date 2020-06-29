import React from "react";
import styled from "@emotion/styled";
import { Button, Container, Segment } from "semantic-ui-react";

export const Footer: React.FC = () => {
  return (
    <Wrapper color="grey" inverted attached="bottom">
      <FooterContainer>
        <ButtonWrapper>
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
        </ButtonWrapper>
        <ButtonWrapper>
          <Button
            circular
            color="black"
            icon="github"
            size="small"
            as="a"
            href="https://github.com/mikan3rd/commitly-web"
            target="_blank"
            rel="noopener noreferrer"
          />
        </ButtonWrapper>
      </FooterContainer>
    </Wrapper>
  );
};

const Wrapper = styled(Segment)`
  &&& {
    padding: 1em;
  }
`;

const FooterContainer = styled(Container)``;

const ButtonWrapper = styled.div`
  display: inline-block;
  margin-right: 15px;
`;
