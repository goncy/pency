import {ServerTenant} from "../types";
import cache from "../cache";

import {database, auth} from "~/firebase/admin";

export default {
  create: (email: string, password: string, tenant: Partial<ServerTenant>) =>
    database
      .collection("tenants")
      .where("slug", "==", tenant.slug)
      .limit(1)
      .get()
      .then((snapshot) =>
        snapshot.empty
          ? auth
              .createUser({
                email,
                password,
              })
              .then((user) => database.collection("tenants").doc(user.uid).create(tenant))
              .catch(({errorInfo}) => Promise.reject({statusText: errorInfo.message, status: 400}))
          : Promise.reject({statusText: "Esa tienda ya existe", status: 409}),
      ),
  fetch: async (slug: ServerTenant["slug"]): Promise<ServerTenant> => {
    return (
      cache.get(slug) ||
      database
        .collection("tenants")
        .where("slug", "==", slug)
        .limit(1)
        .get()
        .then((snapshot) =>
          snapshot.empty
            ? Promise.reject({statusText: "La tienda no existe", status: 404})
            : snapshot.docs[0],
        )
        .then((doc) => ({...(doc.data() as ServerTenant), id: doc.id}))
        .then((tenant) => {
          cache.set(tenant.slug, tenant);

          return tenant;
        })
    );
  },
  list: async (): Promise<ServerTenant[]> =>
    database
      .collection("tenants")
      .get()
      .then((snapshot) =>
        snapshot.empty
          ? Promise.reject({statusText: "No hay tiendas", status: 404})
          : snapshot.docs,
      )
      .then((docs) => docs.map((doc) => ({...(doc.data() as ServerTenant), id: doc.id})))
      .then((tenants) => {
        tenants.forEach((tenant) => {
          cache.set(tenant.slug, tenant);
        });

        return tenants;
      }),
  update: async (
    id: ServerTenant["id"],
    slug: ServerTenant["slug"],
    tenant: Partial<ServerTenant>,
  ) =>
    database
      .collection("tenants")
      .doc(id)
      .update(tenant)
      .then(() => cache.update(slug, {id, slug, ...tenant})),
};
