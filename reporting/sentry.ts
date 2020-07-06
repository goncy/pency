import * as Sentry from "@sentry/browser";

import {Options} from "./types";

export default class SentryErrorProvider {
  // Save a flag to check if it was already initialized
  initialized: boolean = false;

  // Initialize reporter
  constructor() {
    // Check if we are on production
    if (process.env.NODE_ENV === "production") {
      // Initialize service
      this.initialize();
    } else {
      // Log why we cant initialize
      console.info(`Sentry is disabled for ${process.env.NODE_ENV} environment`);
    }
  }

  private initialize() {
    // Check if the service is already initialized
    if (!this.initialized) {
      // And we have a SENTRY_DSN
      if (process.env.SENTRY_DSN) {
        // Initialize
        Sentry.init({
          dsn: process.env.SENTRY_DSN,
        });

        // Set the flag to true
        this.initialized = true;
      } else {
        // Log why we can't initialize
        console.info("No SENTRY_DSN found");
      }
    } else {
      // Log why we didn't initialize
      console.info("Sentry was already initialized");
    }
  }

  exception(error: Error, options: Options) {
    // Check if sentry is initialized
    if (!this.initialized) {
      // Log the error
      console.warn(`Tried to report an error but Sentry was not initialized`, error, options);

      // Early return
      return;
    }

    // If we have an error but it doesn't have a name
    if (error && !error.name) {
      // Set an error named based on extras or origin
      error.name = options?.extras?.message || options?.origin || "Unknown error";
    }

    // Set scopes
    Sentry.withScope((scope) => {
      // Set origin tag
      scope.setTag("origin", options?.origin || "unknown");

      // If we have extras
      if (options?.extras) {
        // Iterate over the extras
        Object.keys(options.extras).forEach((key) => {
          // Set the extra
          scope.setExtra(key, options.extras[key]);
        });
      }

      // Set an extra error
      scope.setExtra("error", error);

      // Capture the exception
      Sentry.captureException(error);
    });
  }

  message(message: string, options: Options) {
    // Check if sentry is initialized
    if (!this.initialized) {
      // Log the error
      console.warn(`Tried to report a message but Sentry was not initialized`, message, options);

      // Early return
      return;
    }

    // Set scopes
    Sentry.withScope((scope) => {
      // Set origin tag
      scope.setTag("origin", options?.origin || "unknown");

      // If we have extras
      if (options?.extras) {
        // Iterate over the extras
        Object.keys(options.extras).forEach((key) => {
          // Set the extra
          scope.setExtra(key, options.extras[key]);
        });
      }

      // Capture the message
      Sentry.captureMessage(message, Sentry.Severity.Warning);
    });
  }
}
