import React from "react";

import { LoginOnly } from "../components/templates/LoginOnly";
import { Setting } from "../components/pages/Setting";

const SettingPage: React.FC = () => {
  return (
    <LoginOnly>
      <Setting />
    </LoginOnly>
  );
};

export default SettingPage;
