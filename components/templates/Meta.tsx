import React from "react";
import Head from "next/head";

export const Meta = React.memo<{
  title: string;
  description?: string;
}>(({ title, description = "Commitlyはあなたの書いたコードを言語別に集計してシェアするサービスです" }) => {
  const titleWithSiteName = `Commitly | ${title}`;
  return (
    <Head>
      <title>{titleWithSiteName}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={titleWithSiteName} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:title" content={titleWithSiteName} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" type="image/png" href="/logo_icon.png" />
    </Head>
  );
});
