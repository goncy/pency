import React from "react";
import {GetStaticProps, GetStaticPaths} from "next";
import {useRouter} from "next/router";

import ProductsScreen from "~/product/screens/Products";
import {ClientTenant} from "~/tenant/types";
import {Product} from "~/product/types";
import StoreLayout from "~/app/layouts/StoreLayout";
import {Provider as I18nProvider} from "~/i18n/context";
import {Provider as CartProvider} from "~/cart/context";
import {Provider as AnalyticsProvider} from "~/analytics/context";
import {Provider as ProductProvider} from "~/product/context";
import {Provider as TenantProvider} from "~/tenant/context";
import LoadingScreen from "~/session/screens/Loading";
import tenantApi from "~/tenant/api/server";
import productApi from "~/product/api/server";
import tenantSchemas from "~/tenant/schemas";
import productSchemas from "~/product/schemas";
import {getRevalidationTime} from "~/tenant/selectors";

interface Props {
  tenant: ClientTenant;
  products: Product[];
  lastUpdate: number;
  nextUpdate: number;
}

const SlugRoute: React.FC<Props> = ({tenant, products, lastUpdate, nextUpdate}) => {
  // Get router instance
  const router = useRouter();

  // If page is being built
  if (router.isFallback) {
    // Show a loading screen
    return <LoadingScreen />;
  }

  // Get the real product from the product id url
  const product = router.query.product
    ? products.find((product) => product.id === router.query.product) || null
    : null;

  return (
    <TenantProvider initialValue={tenant}>
      {(tenant) => (
        <ProductProvider initialValues={products}>
          <AnalyticsProvider>
            <CartProvider>
              <StoreLayout product={product} tenant={tenant}>
                <I18nProvider country={tenant.country}>
                  <ProductsScreen lastUpdate={lastUpdate} nextUpdate={nextUpdate} />
                </I18nProvider>
              </StoreLayout>
            </CartProvider>
          </AnalyticsProvider>
        </ProductProvider>
      )}
    </TenantProvider>
  );
};

export const getStaticProps: GetStaticProps = async ({params: {slug}}) => {
  try {
    // Get the tenant for this page slug
    const tenant: ClientTenant = await tenantApi
      .fetch(slug as ClientTenant["slug"])
      // Cast it as a client tenant
      .then((tenant) => tenantSchemas.client.fetch.cast(tenant));

    // Get its products
    const products: Product[] = await productApi
      .list(tenant.id)
      // Cast all products for client
      .then((products) => products.map((product) => productSchemas.client.fetch.cast(product)));

    // Get the revalidation time
    const revalidationTime = getRevalidationTime(tenant.tier);

    // Get the last updated time
    const lastUpdate = +new Date();

    // Get the next updated time
    const nextUpdate = lastUpdate + revalidationTime * 1000;

    // Return the props and revalidation times
    return {
      props: {tenant, products, lastUpdate, nextUpdate},
      revalidate: revalidationTime,
    };
  } catch (err) {
    // If something failed return a status code that will be intercepted by _app
    return {props: {statusCode: err?.status || err?.statusCode || 404}};
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export default SlugRoute;
