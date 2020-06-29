import React from "react";
import faker from "faker";
import { configure } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { ThemeProvider, CSSReset, Box } from "@chakra-ui/core";
import { Provider as ProductProvider } from "~/product/context";
import { Provider as TenantProvider } from "~/tenant/context";
import { Provider as CartProvider } from "~/cart/context";
import { Provider as AnalyticsProvider } from "~/analytics/context";
import { Provider as I18nProvider } from "~/i18n/context";
import productMock from "~/product/mock"
import tenantMock from "~/tenant/mock"

const PRODUCTS = new Array(20).fill(true).map(() => productMock.withoutVariants);
const TENANT = tenantMock.client.full;

addDecorator(storyFn => (
    <ThemeProvider>
      <CSSReset />
      <TenantProvider initialValue={TENANT}>
        {() => (
          <ProductProvider initialValues={PRODUCTS}>
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
        )}
      </TenantProvider>
    </ThemeProvider>
));
addDecorator(withA11y);
configure(require.context('../', true, /\.stories\.tsx$/), module);
