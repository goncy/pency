import React from "react";
import {GetServerSideProps} from "next";

import fetch from "~/utils/fetch";
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

const StoreRoute: React.FC<Props> = ({tenant, product, products}) => {
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

export const getServerSideProps: GetServerSideProps = async ({
  req: {
    headers: {host},
  },
  params: {slug},
  query,
  res,
}) => {
  try {
    const BASE_URL = `http://${host}/api`;

    const tenant = await fetch("GET", `${BASE_URL}/tenant/${slug}`);
    const products = await fetch("GET", `${BASE_URL}/product?tenant=${tenant.id}`);
    const product = query.product
      ? products.find((product) => product.id === query.product) || null
      : null;

    return {props: {tenant, products, product}};
  } catch (err) {
    return {props: {statusCode: err?.status || res?.statusCode || 404}};
  }
};

export default StoreRoute;
