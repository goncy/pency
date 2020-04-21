import React from "react";
import fetch from "isomorphic-unfetch";

import ProductsScreen from "~/product/screens/Products";

const SlugIndexRoute: React.FC = () => {
  return <ProductsScreen />;
};

export async function getServerSideProps({params: {slug}}) {
  const tenant = await fetch(`http://localhost:3000/api/tenant?slug=${slug}`).then((res) =>
    res.json(),
  );
  const products = await fetch(
    `http://localhost:3000/api/product?tenant=${tenant.id}`,
  ).then((res) => res.json());

  return {props: {tenant, products}};
}

export default SlugIndexRoute;
