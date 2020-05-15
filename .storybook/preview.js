import React from "react";
import { configure } from '@storybook/react';
import { addDecorator } from '@storybook/react';

import { ThemeProvider } from "@chakra-ui/core";
import { Provider as ProductProvider } from "~/product/context";
import { Provider as TenantProvider } from "~/tenant/context";
import { Provider as CartProvider } from "~/cart/context";
import { Provider as AnalyticsProvider } from "~/analytics/context";

addDecorator(storyFn => (
    <ThemeProvider>
        <TenantProvider initialValue={{
            color: "#fff"
        }}>
            <ProductProvider initialValues={[]}>
                <AnalyticsProvider>
                    <CartProvider>
                        {storyFn()}
                    </CartProvider>
                </AnalyticsProvider>
            </ProductProvider>
        </TenantProvider>
    </ThemeProvider>
));

configure(require.context('../product', true, /\.stories\.tsx$/), module);
