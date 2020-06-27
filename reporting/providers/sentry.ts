import * as Sentry from "@sentry/browser";

import ErrorProvider, {ErrorInfo} from "../provider";

export class SentryErrorProvider implements ErrorProvider {
  initialize() {
    if (process.env.SENTRY_DSN) {
      Sentry.init({
        dsn: process.env.SENTRY_DSN,
      });
    }
  }

  captureError(error: Error, errorInfo: ErrorInfo) {
    Sentry.withScope((scope) => {
      scope.setTag("origin", errorInfo.origin);

      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key]);
      });

      scope.setExtra("error", error);

      Sentry.captureException(error);
    });
  }
}
