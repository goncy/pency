import React from "react";
import * as Sentry from "@sentry/browser";
import Document, {Html, Head, Main, NextScript} from "next/document";

if (process.env.NODE_ENV === "production" && process.env.SENTRY_DSN) {
  process.on("unhandledRejection", (err) => {
    Sentry.withScope((scope) => {
      scope.setTag("origin", "SSR - unhandledRejection");
      scope.setExtra("error", JSON.stringify(err));

      Sentry.captureException(err);
    });
  });

  process.on("uncaughtException", (err) => {
    Sentry.withScope((scope) => {
      scope.setTag("origin", "SSR - uncaughtException");
      scope.setExtra("error", JSON.stringify(err));

      Sentry.captureException(err);
    });
  });
}

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
