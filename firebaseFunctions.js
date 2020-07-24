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

exports.nextjsFunc = functions.https.onRequest((req, res) => {
  return nextjsServer.prepare().then(() => nextjsHandle(req, res));
});
