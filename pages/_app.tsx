import React from "react";
import App from "next/app";
import {Flex, ThemeProvider, CSSReset} from "@chakra-ui/core";

import ErrorScreen from "./_error";

import reporter from "~/reporting";

export default class Pency extends App {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    reporter.report(error, {extras: errorInfo, origin: "client"});

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
