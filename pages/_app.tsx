import React from "react";
import {Flex, ThemeProvider, CSSReset} from "@chakra-ui/core";

import ErrorScreen from "./_error";

import {Provider as ProductProvider} from "~/product/context";
import {Provider as TenantProvider} from "~/tenant/context";
import {Provider as CartProvider} from "~/cart/context";
import {Provider as AnalyticsProvider} from "~/analytics/context";
import Header from "~/app/components/Header";

function App({Component, pageProps}) {
  const {tenant, products, statusCode: error} = pageProps;

  React.useEffect(() => {
    /**
     * This help us fix a bug in embed browsers like
     * the Instagram one where the bottom bar chops
     * the complete order button
     */
    require("viewport-units-buggyfill").init();
  }, []);

  return (
    <ThemeProvider>
      <CSSReset />
      {error ? (
        <ErrorScreen statusCode={error} />
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
