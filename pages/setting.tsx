import React from "react";

import { LoginOnly } from "../components/templates/LoginOnly";
import { SEO } from "../components/templates/SEO";
import { Setting } from "../components/pages/Setting";

const SettingPage: React.FC = () => {
  return (
    <LoginOnly>
      <SEO title="Setting" />
      <Setting />
    </LoginOnly>
  );
};

export default SettingPage;
