import {ParsedUrlQuery} from "querystring";

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
import LoadingScreen from "~/app/screens/Loading";
import api from "~/tenant/api/server";
import schemas from "~/tenant/schemas";
import {getRevalidationTime} from "~/tenant/selectors";
import queries from "~/tenant/queries";

interface Props {
  tenant: ClientTenant;
  products: Product[];
  lastUpdate: number;
  nextUpdate: number;
}

interface Params extends ParsedUrlQuery {
  slug: ClientTenant["slug"];
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

export const getStaticProps: GetStaticProps<any, Params> = async ({params: {slug}}) => {
  try {
    // Get the tenant for this page slug
    const {products, ...tenant}: ClientTenant = await api
      .fetch({slug})
      // Cast it as a client tenant
      .then((tenant) => schemas.client.fetch.cast(tenant));

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
    return {
      // If something failed return a status code that will be intercepted by _app
      props: {
        statusCode: err?.status || err?.statusCode || 404,
      },
      // Revalidate after an hour
      revalidate: 3600,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Get slugs from db
  const slugs: string[] = await api
    .list(queries.relevant, {
      // Get just relevant fields
      slug: 1,
    })
    // Map slugs
    .then((tenants) => tenants.map((tenant) => tenant.slug));

  return {
    // Map slugs as params
    paths: slugs.map((slug) => ({params: {slug}})),
    // Build not relevant ones on demand
    fallback: true,
  };
};

export default SlugRoute;
