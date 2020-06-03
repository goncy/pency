import {ServerTenant} from "../types";
import {formatServerTenant, parseServerTenant} from "../selectors";

import {database, auth} from "~/firebase/admin";
import {CartItem} from "~/cart/types";

export default {
  create: (email: string, password: string, tenant: Partial<ServerTenant>) => {
    const base = formatServerTenant(tenant);

    return database
      .collection("tenants")
      .where("slug", "==", base.slug)
      .limit(1)
      .get()
      .then((snapshot) =>
        snapshot.empty
          ? auth
              .createUser({
                email,
                password,
              })
              .then((user) => database.collection("tenants").doc(user.uid).create(base))
              .catch(({errorInfo}) => Promise.reject({statusText: errorInfo.message, status: 400}))
          : Promise.reject({statusText: "Esa tienda ya existe", status: 409}),
      );
  },
  fetch: async (slug: ServerTenant["slug"]): Promise<ServerTenant> =>
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
      .then((doc) => parseServerTenant({...doc.data(), id: doc.id})),
  list: async (): Promise<ServerTenant[]> =>
    database
      .collection("tenants")
      .get()
      .then((snapshot) =>
        snapshot.empty
          ? Promise.reject({statusText: "No hay tiendas", status: 404})
          : snapshot.docs,
      )
      .then((docs) => docs.map((doc) => parseServerTenant({...doc.data(), id: doc.id}))),
  update: async ({id, ...tenant}: Partial<ServerTenant>) =>
    database.collection("tenants").doc(id).update(formatServerTenant(tenant)),
  preference: async (items: CartItem[], successUrl: string, token: string) => {
    // fetch(`https://api.mercadopago.com/checkout/preferences?access_token=${token}`, {
    //   items: [
    //     {
    //       title: title,
    //       quantity: 1,
    //       currency_id: "ARS",
    //       unit_price: price,
    //     },
    //   ],
    //   external_reference: {
    //     coffeeId,
    //   },
    //   back_urls: {
    //     success: process.env.URL,
    //   },
    //   auto_return: "approved",
    //   payment_methods: {
    //     installments: 1,
    //     default_installments: 1,
    //   },
    // });

    return Promise.resolve({items, successUrl, token});
  },
};
