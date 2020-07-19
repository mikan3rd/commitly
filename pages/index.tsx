import React from "react";

import { Index } from "../components/pages/Index";
import { SEO } from "../components/templates/SEO";

const IndexPage: React.FC = () => {
  return (
    <>
      <SEO title="TOP" />
      <Index />
    </>
  );
};

export default IndexPage;
