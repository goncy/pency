import React from "react";

import {Provider as SessionProvider} from "~/session/context";
import fetch from "~/utils/fetch";
import {Tenant} from "~/tenant/types";
import AdminScreen from "~/app/screens/Admin";
import AdminLayout from "~/app/layouts/AdminLayout";

interface Props {
  tenant: Tenant;
}

const AdminRoute: React.FC<Props> = ({tenant}) => {
  return (
    <AdminLayout>
      <SessionProvider>
        <AdminScreen tenant={tenant} />
      </SessionProvider>
    </AdminLayout>
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
