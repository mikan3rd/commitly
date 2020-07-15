import React from "react";
import { AppProps } from "next/app";
import { SemanticToastContainer } from "react-semantic-toasts";

import UserProvider from "../context/userContext";

import "semantic-ui-css/semantic.min.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
      <SemanticToastContainer position="top-center" />
    </UserProvider>
  );
}
export default MyApp;
