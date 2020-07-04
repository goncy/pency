import React from "react";
import Document, {Html, Head, Main, NextScript} from "next/document";

import reporter from "~/reporting";

process.on("unhandledRejection", (error: Error) => {
  reporter.report(error, {origin: "server | unhandledRejection"});
});

process.on("uncaughtException", (error: Error) => {
  reporter.report(error, {origin: "server | uncaughtException"});
});

export default class extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
