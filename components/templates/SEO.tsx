import React from "react";
import Head from "next/head";

export const SEO = React.memo<{
  title: string;
}>(({ title }) => {
  const titleWithSiteName = `Commitly | ${title}`;
  return (
    <Head>
      <title>{titleWithSiteName}</title>
      <meta property="og:title" content={titleWithSiteName} />
    </Head>
  );
});
