import React from "react";

import {api as productApi} from "~/pages/api/product";
import {api as tenantApi} from "~/pages/api/tenant";
import ProductsScreen from "~/product/screens/Products";

const SlugIndexRoute: React.FC = () => {
  return <ProductsScreen />;
};

export async function getServerSideProps({params: {slug}}) {
  try {
    const tenant = await tenantApi.fetch(slug);
    const products = await productApi.list(tenant.id);

    return {props: {tenant, products}};
  } catch (e) {
    const {status, statusText: text} = e;
    return {props: {error: {status, text}}};
  }
}

export default SlugIndexRoute;
