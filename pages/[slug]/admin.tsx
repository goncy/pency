import React from "react";

import {Provider as SessionProvider} from "~/session/context";
import fetch from "~/utils/fetch";
import {Tenant} from "~/tenant/types";
import {Product} from "~/product/types";
import AdminScreen from "~/app/screens/Admin";
import AdminLayout from "~/app/layouts/AdminLayout";
import {Provider as I18nProvider} from "~/i18n/context";
import {Provider as ProductProvider} from "~/product/context";
import {Provider as TenantProvider} from "~/tenant/context";
interface Props {
  tenant: Tenant;
  products: Product[];
}

const AdminRoute: React.FC<Props> = ({tenant, products}) => {
  return (
    <TenantProvider initialValue={tenant}>
      <ProductProvider initialValues={products}>
        <AdminLayout>
          <I18nProvider>
            <SessionProvider>
              <AdminScreen tenant={tenant} />
            </SessionProvider>
          </I18nProvider>
        </AdminLayout>
      </ProductProvider>
    </TenantProvider>
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

export default AdminRoute;
