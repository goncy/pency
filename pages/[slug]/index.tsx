import React from "react";

import ProductsScreen from "~/product/screens/Products";
import tenantApi from "~/tenant/api";
import productApi from "~/product/api";

const SlugIndexRoute: React.FC = () => {
  return <ProductsScreen />;
};

export async function getServerSideProps({params: {slug}}) {
  try {
    const tenant = await tenantApi.fetch(slug);
    const products = await productApi.list(tenant.id);

    return {props: {tenant, products}};
  } catch (error) {
    return {props: {error}};
  }
}

export default SlugIndexRoute;
