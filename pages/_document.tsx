import React from "react";
import * as Sentry from "@sentry/browser";
import Document, {Main, NextScript} from "next/document";

if (process.env.NODE_ENV === "production") {
  process.on("unhandledRejection", (err) => {
    Sentry.captureException(err);
  });

  process.on("uncaughtException", (err) => {
    Sentry.captureException(err);
  });
}

export default class extends Document {
  render() {
    return (
      <html>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
