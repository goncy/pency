import React from "react";
import App from "next/app";
import * as Sentry from "@sentry/browser";
import {Flex, ThemeProvider, CSSReset} from "@chakra-ui/core";

import ErrorScreen from "./_error";

if (process.env.NODE_ENV === "production" && process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
  });
}

export default class Pency extends App {
  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV === "production" && process.env.SENTRY_DSN) {
      Sentry.withScope((scope) => {
        scope.setTag("origin", "componentDidCatch");

        Object.keys(errorInfo).forEach((key) => {
          scope.setExtra(key, errorInfo[key]);
        });

        scope.setExtra("error", error);

        Sentry.captureException(error);
      });
    }

    super.componentDidCatch(error, errorInfo);
  }

  componentDidMount() {
    /**
     * This help us fix a bug in embed browsers like
     * the Instagram one where the bottom bar chops
     * the review order button
     */
    require("viewport-units-buggyfill").init();
  }

  render() {
    const {Component, pageProps} = this.props;
    const {statusCode: error} = pageProps;

    return (
      <ThemeProvider>
        <CSSReset />
        {error ? (
          <ErrorScreen statusCode={error} />
        ) : (
          <Flex direction="column" height="100%">
            <Component {...pageProps} />
          </Flex>
        )}
      </ThemeProvider>
    );
  }
}
