import * as Sentry from "@sentry/browser";

import {Options} from "./types";

export default class SentryErrorProvider {
  constructor() {
    if (process.env.NODE_ENV === "production") {
      this.initialize();
    } else {
      console.info(`Sentry is disabled for ${process.env.NODE_ENV} environment`);
    }
  }

  private initialize() {
    if (process.env.SENTRY_DSN) {
      Sentry.init({
        dsn: process.env.SENTRY_DSN,
      });
    } else {
      console.info("No SENTRY_DSN found");
    }
  }

  report(error: Error, options: Options) {
    Sentry.withScope((scope) => {
      scope.setTag("origin", options?.origin || "unknown");

      if (options?.extras) {
        Object.keys(options.extras).forEach((key) => {
          scope.setExtra(key, options.extras[key]);
        });
      }

      scope.setExtra("error", error);

      Sentry.captureException(error);
    });
  }
}
