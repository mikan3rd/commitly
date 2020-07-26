import React from "react";

import { Index } from "../components/pages/Index";
import { Meta } from "../components/templates/Meta";

const IndexPage: React.FC = () => {
  return (
    <>
      <Meta title="TOP" />
      <Index />
    </>
  );
};

export default IndexPage;
