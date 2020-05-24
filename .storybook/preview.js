import React from "react";
import { configure } from '@storybook/react';
import { addDecorator } from '@storybook/react';

import { ThemeProvider, CSSReset, Box } from "@chakra-ui/core";
import { Provider as ProductProvider } from "~/product/context";
import { Provider as TenantProvider } from "~/tenant/context";
import { Provider as CartProvider } from "~/cart/context";
import { Provider as AnalyticsProvider } from "~/analytics/context";
import { Provider as I18nProvider } from "~/i18n/context";

addDecorator(storyFn => (
    <ThemeProvider>
      <CSSReset />
      <TenantProvider initialValue={{color: "cyan"}}>
        <ProductProvider initialValues={[]}>
          <AnalyticsProvider>
            <CartProvider>
              <I18nProvider>
                <Box padding={4}>
                  {storyFn()}
                </Box>
              </I18nProvider>
            </CartProvider>
          </AnalyticsProvider>
        </ProductProvider>
      </TenantProvider>
    </ThemeProvider>
));

configure(require.context('../', true, /\.stories\.tsx$/), module);
