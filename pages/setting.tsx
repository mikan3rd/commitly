import React from "react";

import { Layout } from "../components/templates/Layout";
import { LoginOnly } from "../components/templates/LoginOnly";
import { Setting } from "../components/pages/Setting";

const SettingPage: React.FC = () => {
  return (
    <Layout>
      <LoginOnly>
        <Setting />
      </LoginOnly>
    </Layout>
  );
};

export default SettingPage;
