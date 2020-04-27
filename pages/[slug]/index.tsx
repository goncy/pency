import React from "react";
import fetch from "isomorphic-unfetch";

import ProductsScreen from "~/product/screens/Products";

const SlugIndexRoute: React.FC = () => {
  return <ProductsScreen />;
};

export async function getServerSideProps({params: {slug}, req}) {
  const BASE_URL = `http://${req.headers.host}/api`;

  try {
    const tenant = await fetch(`${BASE_URL}/tenant?slug=${slug}`).then((res) =>
      res.ok ? res.json() : Promise.reject(res),
    );
    const products = await fetch(`${BASE_URL}/product?tenant=${tenant.id}`).then((res) =>
      res.ok ? res.json() : Promise.reject(res),
    );

    return {props: {tenant, products}};
  } catch ({status, statusText: text}) {
    return {props: {error: {status, text}}};
  }
}

export default SlugIndexRoute;
