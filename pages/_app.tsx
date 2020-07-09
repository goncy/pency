import React from "react";
import App from "next/app";
import {ThemeProvider, CSSReset} from "@chakra-ui/core";

import ErrorScreen from "./_error";

import reporter from "~/reporting";

process.on("unhandledRejection", (error: Error) => {
  reporter.exception(error, {origin: "server | unhandledRejection"});
});

process.on("uncaughtException", (error: Error) => {
  reporter.exception(error, {origin: "server | uncaughtException"});
});

export default class Pency extends App {
  componentDidMount() {
    /**
     * This help us fix a bug in embed browsers like
     * the Instagram one where the bottom bar chops
     * the review order button
     */
    require("viewport-units-buggyfill").init();
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    reporter.exception(error, {extras: errorInfo, origin: "client"});

    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const {Component, pageProps} = this.props;
    const {statusCode: error} = pageProps;

    return (
      <ThemeProvider>
        <CSSReset />
        {error ? <ErrorScreen statusCode={error} /> : <Component {...pageProps} />}
      </ThemeProvider>
    );
  }
}
