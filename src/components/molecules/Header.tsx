import React from "react";
import { css } from "@emotion/core";
import Link from "next/link";
import { Dropdown, Icon, Image } from "semantic-ui-react";

import { useUser } from "../../context/userContext";

export const Header: React.FC = () => {
  const { user, userDoc, login, logout } = useUser();
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
      <Link href="/" passHref>
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
        <Dropdown.Menu direction="left">
          {user && userDoc ? (
            <>
              <Link href="/" passHref>
                <Dropdown.Item text="トップ" icon="home" />
              </Link>
              <Link href={`/profile/${userDoc.github.username}`} passHref>
                <Dropdown.Item text="プロフィール" icon="user" />
              </Link>
              <Link href="/setting" passHref>
                <Dropdown.Item text="設定" icon="setting" />
              </Link>
              <Dropdown.Item text="ログアウト" icon="sign-out" onClick={() => logout()} />
            </>
          ) : (
            <>
              <Dropdown.Item text="ログイン" icon="sign-in" onClick={() => login()} />
              <Link href="/" passHref>
                <Dropdown.Item text="トップ" icon="home" />
              </Link>
            </>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </header>
  );
};
