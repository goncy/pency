import {ParsedUrlQuery} from "querystring";

import React from "react";
import {GetServerSideProps} from "next";

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

interface Params extends ParsedUrlQuery {
  slug: ClientTenant["slug"];
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

export const getServerSideProps: GetServerSideProps<any, Params> = async function ({res}) {
  try {
    // Get the tenant for this page slug
    const tenant: ClientTenant = await tenantApi
      .fetch(process.env.STORE_SLUG)
      // Cast it as a client tenant
      .then((tenant) => tenantSchemas.client.fetch.cast(tenant, {stripUnknown: true}));

    // Get its products
    const products: Product[] = await productApi
      .list(tenant.id)
      // Cast all products for client
      .then((products) =>
        products.map((product) => productSchemas.client.fetch.cast(product, {stripUnknown: true})),
      );

    // Return props
    return {props: {tenant, products}};
  } catch (err) {
    // If something failed report it to _app.tsx
    return {props: {statusCode: err?.status || res?.statusCode || 404}};
  }
};

export default AdminRoute;
