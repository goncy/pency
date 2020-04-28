import React from "react";

import tenantApi from "~/tenant/api";
import productsApi from "~/product/api";
import ProductsScreen from "~/product/screens/Products";

const SlugIndexRoute: React.FC = () => {
  return <ProductsScreen />;
};

export async function getServerSideProps({params: {slug}}) {
  try {
    const tenant = await tenantApi.fetch(slug);
    const products = await productsApi.list(tenant.id);

    return {props: {tenant, products}};
  } catch ({status, statusText: text}) {
    return {props: {error: {status, text}}};
  }
}

export default SlugIndexRoute;
