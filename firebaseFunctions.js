/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require("path");

const functions = require("firebase-functions");
const { default: next } = require("next");

const nextjsDistDir = join("src", require("./src/next.config.js").distDir);

const nextjsServer = next({
  conf: {
    distDir: nextjsDistDir,
  },
});
const nextjsHandle = nextjsServer.getRequestHandler();

// If you are using HTTP functions to serve dynamic content for Firebase Hosting, you must use us-central1.
// https://firebase.google.com/docs/functions/locations#http_and_client_callable_functions
exports.nextjsFunc = functions.region("us-central1").https.onRequest(async (req, res) => {
  await nextjsServer.prepare();
  return nextjsHandle(req, res);
});
