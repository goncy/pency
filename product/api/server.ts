import shortid from "shortid";

import {Product} from "../types";
import {serverToClient, clientToServer} from "../selectors";
import cache from "../cache";
import schemas from "../schemas";

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
  upsert: (tenant: ClientTenant["id"], products: Product[]) => {
    const batch = database.batch();

    const commited = products.map((product) => {
      if (product.id) {
        const {id, ...formatted} = schemas.update.cast(product);

        batch.update(
          database.collection("tenants").doc(tenant).collection("products").doc(id),
          formatted,
        );

        return {id, ...formatted};
      } else {
        const formatted = schemas.create.cast(product);
        const docId = shortid.generate();

        batch.create(
          database.collection("tenants").doc(tenant).collection("products").doc(docId),
          formatted,
        );

        return {id: docId, ...formatted};
      }
    });

    return batch.commit().then(() => {
      const products = commited.map(({id, ...product}) => {
        cache.update(tenant, id, product);

        return {id, ...product};
      });

      return products;
    });
  },
};
