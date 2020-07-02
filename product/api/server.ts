import {Product} from "../types";
import {serverToClient, clientToServer} from "../selectors";
import cache from "../cache";

import {database} from "~/firebase/admin";
import {ClientTenant} from "~/tenant/types";

export default {
  list: async (tenant: ClientTenant["id"]): Promise<Product[]> => {
    return (
      cache.get(tenant) ||
      database
        .collection("tenants")
        .doc(tenant)
        .collection("products")
        .get()
        .then((snapshot) => snapshot.docs.map((doc) => ({...(doc.data() as Product), id: doc.id})))
        .then((products) => {
          const parsed = products.map(serverToClient);

          cache.set(tenant, parsed);

          return parsed;
        })
    );
  },
  create: (tenant: ClientTenant["id"], product: Product) => {
    const formated = clientToServer(product);

    return database
      .collection("tenants")
      .doc(tenant)
      .collection("products")
      .add(formated)
      .then((snapshot) => {
        const parsed: Product = {...formated, id: snapshot.id};

        cache.add(tenant, parsed);

        return parsed;
      });
  },
  remove: (tenant: ClientTenant["id"], product: Product["id"]) =>
    database
      .collection("tenants")
      .doc(tenant)
      .collection("products")
      .doc(product)
      .delete()
      .then(() => {
        cache.pluck(tenant, product);

        return product;
      }),
  update: (tenant: ClientTenant["id"], {id, ...product}: Product) => {
    const formated = clientToServer(product);

    return database
      .collection("tenants")
      .doc(tenant)
      .collection("products")
      .doc(id)
      .update(formated)
      .then(() => {
        cache.update(tenant, id, formated);

        return formated;
      });
  },
  bulk: {
    update: (tenant: ClientTenant["id"], products: Product[]) => {
      const batch = database.batch();

      const commited = products.map(({id, ...product}) => {
        const formatted = clientToServer(product);

        batch.update(
          database.collection("tenants").doc(tenant).collection("products").doc(id),
          formatted,
        );

        return {id, ...formatted};
      });

      return batch.commit().then(() => {
        const products = commited.map(({id, ...product}) => {
          cache.update(tenant, id, product);

          return product;
        });

        return products;
      });
    },
  },
};
