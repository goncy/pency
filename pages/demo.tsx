import React from "react";
import {GetStaticProps} from "next";

import ProductsScreen from "~/product/screens/Products";
import {ClientTenant} from "~/tenant/types";
import {Product} from "~/product/types";
import StoreLayout from "~/app/layouts/StoreLayout";
import {Provider as I18nProvider} from "~/i18n/context";
import {Provider as CartProvider} from "~/cart/context";
import {Provider as AnalyticsProvider} from "~/analytics/context";
import {Provider as ProductProvider} from "~/product/context";
import {Provider as TenantProvider} from "~/tenant/context";

interface Props {
  tenant: ClientTenant;
  products: Product[];
  product: Product;
}

interface Store {
  TENANT: ClientTenant;
  PRODUCTS: Product[];
}

const DemoRoute: React.FC<Props> = ({tenant, product, products}) => {
  // Avoid breaking on not ready environments
  if (!tenant || !products?.length) return null;

  return (
    <TenantProvider initialValue={tenant}>
      {(tenant) => (
        <ProductProvider initialValues={products}>
          <AnalyticsProvider>
            <CartProvider>
              <StoreLayout product={product} tenant={tenant}>
                <I18nProvider country={tenant.country}>
                  <ProductsScreen />
                </I18nProvider>
              </StoreLayout>
            </CartProvider>
          </AnalyticsProvider>
        </ProductProvider>
      )}
    </TenantProvider>
  );
};

// Get static props for demo
export const getStaticProps: GetStaticProps = async () => {
  // Get store from catalog
  const {TENANT, PRODUCTS}: Store = await import(`~/app/constants/stores/${process.env.ENV}.ts`);

  // Return props
  return {
    props: {
      tenant: TENANT,
      products: PRODUCTS,
    },
  };
};

export default DemoRoute;
