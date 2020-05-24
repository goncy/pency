import React from "react";

import fetch from "~/utils/fetch";
import ProductsScreen from "~/product/screens/Products";
import {Tenant} from "~/tenant/types";
import {Provider as I18nProvider} from "~/i18n/context";
import StoreLayout from "~/app/layouts/StoreLayout";

interface Props {
  tenant: Tenant;
}

const SlugIndexRoute: React.FC<Props> = ({tenant}) => {
  return (
    <StoreLayout tenant={tenant}>
      <I18nProvider>
        <ProductsScreen />
      </I18nProvider>
    </StoreLayout>
  );
};

export async function getServerSideProps({
  req: {
    headers: {host},
  },
  params: {slug},
  res,
}) {
  try {
    const BASE_URL = `http://${host}/api`;

    const tenant = await fetch("GET", `${BASE_URL}/tenant?slug=${slug}`);
    const products = await fetch("GET", `${BASE_URL}/product?tenant=${tenant.id}`);

    return {props: {tenant, products}};
  } catch (err) {
    return {props: {statusCode: err?.status || res?.statusCode || 404}};
  }
}

export default SlugIndexRoute;
