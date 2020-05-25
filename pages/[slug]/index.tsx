import React from "react";

import fetch from "~/utils/fetch";
import ProductsScreen from "~/product/screens/Products";
import {Tenant} from "~/tenant/types";
import {Product} from "~/product/types";
import StoreLayout from "~/app/layouts/StoreLayout";
import {Provider as I18nProvider} from "~/i18n/context";
import {Provider as CartProvider} from "~/cart/context";
import {Provider as AnalyticsProvider} from "~/analytics/context";
import {Provider as ProductProvider} from "~/product/context";
import {Provider as TenantProvider} from "~/tenant/context";
interface Props {
  tenant: Tenant;
  products: Product[];
}

const SlugIndexRoute: React.FC<Props> = ({tenant, products}) => {
  return (
    <TenantProvider initialValue={tenant}>
      <ProductProvider initialValues={products}>
        <AnalyticsProvider>
          <CartProvider>
            <StoreLayout tenant={tenant}>
              <I18nProvider>
                <ProductsScreen />
              </I18nProvider>
            </StoreLayout>
          </CartProvider>
        </AnalyticsProvider>
      </ProductProvider>
    </TenantProvider>
  );
};

export async function getServerSideProps({
  req: {
    headers: {host},
  },
  params: {slug},
  res,
}) {
  try {
    const BASE_URL = `http://${host}/api`;

    const tenant = await fetch("GET", `${BASE_URL}/tenant?slug=${slug}`);
    const products = await fetch("GET", `${BASE_URL}/product?tenant=${tenant.id}`);

    return {props: {tenant, products}};
  } catch (err) {
    return {props: {statusCode: err?.status || res?.statusCode || 404}};
  }
}

export default SlugIndexRoute;
