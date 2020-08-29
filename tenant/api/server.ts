import {ServerTenant, ClientTenant} from "../types";

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
    return database
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
      .then((tenant) => tenant);
  },
  update: async (id: ServerTenant["id"], tenant: Partial<ServerTenant> | Partial<ClientTenant>) =>
    database
      .collection("tenants")
      .doc(id)
      .update(tenant)
      .then(() => tenant),
};
