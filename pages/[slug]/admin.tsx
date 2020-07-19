import React from "react";

import {Provider as SessionProvider} from "~/session/context";
import {ClientTenant} from "~/tenant/types";
import {Product} from "~/product/types";
import AdminScreen from "~/app/screens/Admin";
import AdminLayout from "~/app/layouts/AdminLayout";
import {Provider as I18nProvider} from "~/i18n/context";
import {Provider as ProductProvider} from "~/product/context";
import {Provider as TenantProvider} from "~/tenant/context";
import tenantApi from "~/tenant/api/server";
import productApi from "~/product/api/server";
import tenantSchemas from "~/tenant/schemas";
import productSchemas from "~/product/schemas";
interface Props {
  tenant: ClientTenant;
  products: Product[];
}

const AdminRoute: React.FC<Props> = ({tenant, products}) => {
  return (
    <TenantProvider initialValue={tenant}>
      {(tenant) => (
        <ProductProvider initialValues={products}>
          <AdminLayout>
            <I18nProvider country={tenant.country}>
              <SessionProvider>
                <AdminScreen />
              </SessionProvider>
            </I18nProvider>
          </AdminLayout>
        </ProductProvider>
      )}
    </TenantProvider>
  );
};

export async function getServerSideProps({params: {slug}, res}) {
  try {
    // Get the tenant for this page slug
    const tenant: ClientTenant = await tenantApi
      .fetch(slug as ClientTenant["slug"])
      // Cast it as a client tenant
      .then((tenant) => tenantSchemas.client.fetch.cast(tenant));

    // Get its products
    const products: Product[] = await productApi
      .list(tenant.id)
      // Cast all products for client
      .then((products) => products.map((product) => productSchemas.client.fetch.cast(product)));

    return {props: {tenant, products}};
  } catch (err) {
    return {props: {statusCode: err?.status || res?.statusCode || 404}};
  }
}

export default AdminRoute;
