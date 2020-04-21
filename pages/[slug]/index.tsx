import React from "react";
import fetch from "isomorphic-unfetch";

import ProductsScreen from "~/product/screens/Products";

const SlugIndexRoute: React.FC = () => {
  return <ProductsScreen />;
};

export async function getServerSideProps({params: {slug}, req}) {
  const BASE_URL = `http://${req.headers.host}/api`;

  const tenant = await fetch(`${BASE_URL}/tenant?slug=${slug}`).then((res) => res.json());
  const products = await fetch(`${BASE_URL}/product?tenant=${tenant.id}`).then((res) => res.json());

  return {props: {tenant, products}};
}

export default SlugIndexRoute;
