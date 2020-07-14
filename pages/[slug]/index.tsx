import React from "react";
import {GetStaticProps, GetStaticPaths} from "next";
import {useRouter} from "next/router";

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
import {REVALIDATION_TIMES} from "~/tenant/constants";
import LoadingScreen from "~/app/screens/Loading";

interface Props {
  tenant: ClientTenant;
  products: Product[];
  lastUpdate: number;
}

const SlugRoute: React.FC<Props> = ({tenant, products, lastUpdate}) => {
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
                  <ProductsScreen lastUpdate={lastUpdate} />
                </I18nProvider>
              </StoreLayout>
            </CartProvider>
          </AnalyticsProvider>
        </ProductProvider>
      )}
    </TenantProvider>
  );
};

export const getStaticProps: GetStaticProps = async ({params}) => {
  try {
    // Get the base url for requests
    const BASE_URL = `${process.env.APP_URL}/api`;

    // Get the tenant for this page slug
    const tenant: ClientTenant = await fetch("GET", `${BASE_URL}/tenant/${params.slug}`);

    // Get its products
    const products: Product[] = await fetch("GET", `${BASE_URL}/product/${tenant.id}`);

    // Get the last updated time
    const lastUpdate = +new Date();

    // Get the revalidation time
    const revalidationTime = REVALIDATION_TIMES[tenant.tier];

    // Return the props and revalidation times
    return {
      props: {tenant, products, lastUpdate},
      unstable_revalidate: revalidationTime,
    };
  } catch (err) {
    // If something failed return a status code that will be intercepted by _app
    return {props: {statusCode: err?.status || err?.statusCode || 404}};
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Get the base url for requests
  const BASE_URL = `${process.env.APP_URL}/api`;

  // Get all the tenants
  const tenants: ClientTenant[] = await fetch("GET", `${BASE_URL}/tenant`);

  // Get the slugs of all relevant tenants
  const relevant = tenants
    // Filter the ones that are not on the free plan
    .filter((tenant) => tenant.tier !== "free")
    // Get the slugs
    .map((tenant) => tenant.slug);

  // Return them for being used on getStaticProps
  return {
    paths: relevant.map((slug) => ({
      params: {
        slug,
      },
    })),
    fallback: true,
  };
};

export default SlugRoute;
