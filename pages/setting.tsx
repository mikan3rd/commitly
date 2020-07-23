import React from "react";

import { LoginOnly } from "../components/templates/LoginOnly";
import { Meta } from "../components/templates/Meta";
import { Setting } from "../components/pages/Setting";

const SettingPage: React.FC = () => {
  return (
    <LoginOnly>
      <Meta title="Setting" />
      <Setting />
    </LoginOnly>
  );
};

export default SettingPage;
