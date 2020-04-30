import React from "react";

import fetch from "~/utils/fetch";
import ProductsScreen from "~/product/screens/Products";
import {Tenant} from "~/tenant/types";
import Head from "~/app/components/Head";

interface Props {
  tenant: Tenant;
}

const SlugIndexRoute: React.FC<Props> = ({tenant}) => {
  return (
    <>
      <Head track tenant={tenant} />
      <ProductsScreen />
    </>
  );
};

export async function getServerSideProps({
  req: {
    headers: {host},
  },
  params: {slug},
}) {
  try {
    const BASE_URL = `http://${host}/api`;

    const tenant = await fetch("GET", `${BASE_URL}/tenant?slug=${slug}`);
    const products = await fetch("GET", `${BASE_URL}/product?tenant=${tenant.id}`);

    return {props: {tenant, products}};
  } catch ({status, statusText: text}) {
    return {props: {error: {status, text}}};
  }
}

export default SlugIndexRoute;
