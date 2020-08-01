import React from "react";
import { AppProps } from "next/app";

import { Layout } from "../components/templates/Layout";
import UserProvider from "../context/userContext";

import "semantic-ui-css/semantic.min.css";
import "react-semantic-toasts/styles/react-semantic-alert.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}
export default MyApp;
