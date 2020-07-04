import React from "react";
import { css } from "@emotion/core";
import Link from "next/link";
import { Dropdown, Icon, Image } from "semantic-ui-react";

export const Header: React.FC = () => {
  return (
    <header
      css={css`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 60px;
        background-color: #fdd101;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 1;
      `}
    >
      <Link href="/">
        <a
          css={css`
            height: 80%;
            margin-left: 10px;
          `}
        >
          <Image
            src="/logo_header.png"
            css={css`
              height: 100%;
            `}
          />
        </a>
      </Link>

      <Dropdown
        icon={
          <Icon
            name="bars"
            size="big"
            css={css`
              &&& {
                margin-right: 10px;
              }
            `}
          />
        }
      >
        <Dropdown.Menu direction="left"></Dropdown.Menu>
      </Dropdown>
    </header>
  );
};
