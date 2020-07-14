import React from "react";
import {GetStaticProps, GetStaticPaths} from "next";
import {useRouter} from "next/router";
import {Flex, Spinner} from "@chakra-ui/core";

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
}

const SlugRoute: React.FC<Props> = ({tenant, products}) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Flex alignItems="center" height="100vh" justifyContent="center" width="100vw">
        <Spinner color="teal.500" />
      </Flex>
    );
  }

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

export const getStaticProps: GetStaticProps = async ({params}) => {
  try {
    const BASE_URL = `${process.env.APP_URL}/api`;

    const tenant: ClientTenant = await fetch("GET", `${BASE_URL}/tenant/${params.slug}`);
    const products: Product[] = await fetch("GET", `${BASE_URL}/product?tenant=${tenant.id}`);

    return {
      props: {tenant, products},
      unstable_revalidate: REVALIDATION_TIMES[tenant.tier],
    };
  } catch (err) {
    return {props: {statusCode: err?.status || err?.statusCode || 404}};
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const BASE_URL = `${process.env.APP_URL}/api`;

  const tenants: ClientTenant[] = await fetch("GET", `${BASE_URL}/tenant`);

  return {
    paths: tenants.map((tenant) => ({
      params: {
        slug: tenant.slug,
      },
    })),
    fallback: true,
  };
};

export default SlugRoute;
