import React from "react";
import {Global, css} from "@emotion/core";
import {Flex, ThemeProvider, CSSReset} from "@chakra-ui/core";

import ErrorScreen from "~/app/screens/Error";
import {Provider as ProductProvider} from "~/product/context";
import {Provider as TenantProvider} from "~/tenant/context";
import {Provider as CartProvider} from "~/cart/context";
import {Provider as AnalyticsProvider} from "~/analytics/context";
import Header from "~/app/components/Header";

function App({Component, pageProps}) {
  const {tenant, products, error} = pageProps;

  React.useEffect(() => {
    require("viewport-units-buggyfill").init();
  }, []);

  return (
    <ThemeProvider>
      <CSSReset />
      <Global
        styles={css`
          html,
          body {
            height: 100%;
            max-height: 100vh;
            width: 100%;
            max-width: 100vw;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
              "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            overscroll-behavior: contain;
            overflow: hidden;
            position: fixed;
          }

          #__next {
            height: 100%;
          }

          * {
            touch-action: manipulation;
          }

          #drawer-cart,
          #drawer-product,
          #drawer-options {
            height: 100% !important;
          }

          #modal-image {
            height: inherit !important;
            margin: 0 !important;
          }
        `}
      />
      {error ? (
        <ErrorScreen {...pageProps} />
      ) : tenant && products ? (
        <TenantProvider initialValue={tenant}>
          <Flex direction="column" height="100%">
            <Header />
            <ProductProvider initialValues={products}>
              <AnalyticsProvider>
                <CartProvider>
                  <Component {...pageProps} />
                </CartProvider>
              </AnalyticsProvider>
            </ProductProvider>
          </Flex>
        </TenantProvider>
      ) : (
        <Component {...pageProps} />
      )}
    </ThemeProvider>
  );
}

export default App;
