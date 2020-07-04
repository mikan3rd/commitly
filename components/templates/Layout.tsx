import React from "react";
import { css } from "@emotion/core";
import { Container } from "semantic-ui-react";

import { Header } from "../molecules/Header";
import { Footer } from "../molecules/Footer";

export const Layout: React.FC = ({ children }) => {
  return (
    <div
      css={css`
        display: flex;
        min-height: 100vh;
        flex-direction: column;
        background-color: #f7f7f7;
      `}
    >
      <Header />
      <Container
        text
        css={css`
          flex: 1;
          margin-top: 60px;
        `}
      >
        {children}
      </Container>
      <Footer />
    </div>
  );
};
