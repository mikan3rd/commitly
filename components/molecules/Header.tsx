import React from "react";
import styled from "@emotion/styled";
import { css } from "emotion";
import Link from "next/link";
import { Dropdown, Icon, Image } from "semantic-ui-react";

export const Header: React.FC = () => {
  return (
    <Wrapper>
      <Link href="/">
        <a
          className={css`
            height: 80%;
            margin-left: 10px;
          `}
        >
          <LogoImage src="/logo_header.png" />
        </a>
      </Link>

      <Dropdown icon={<BarIcon name="bars" size="big" />}>
        <Dropdown.Menu direction="left"></Dropdown.Menu>
      </Dropdown>
    </Wrapper>
  );
};

const Wrapper = styled.header`
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
`;

const LogoImage = styled(Image)`
  &&& {
    height: 100%;
  }
`;

const BarIcon = styled(Icon)`
  &&& {
    margin-right: 10px;
  }
`;
