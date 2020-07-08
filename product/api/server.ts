import shortid from "shortid";

import {Product} from "../types";
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
          const parsed = products.map((product) => schemas.client.fetch.cast(product));

          cache.set(tenant, parsed);

          return parsed;
        })
    );
  },
  create: (tenant: ClientTenant["id"], product: Product) => {
    const casted = schemas.server.create.cast(product);

    return database
      .collection("tenants")
      .doc(tenant)
      .collection("products")
      .add(casted)
      .then((snapshot) => {
        const product: Product = {...casted, id: snapshot.id};

        cache.add(tenant, product);

        return product;
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
    const casted = schemas.server.update.cast(product);

    return database
      .collection("tenants")
      .doc(tenant)
      .collection("products")
      .doc(id)
      .update(casted)
      .then(() => {
        cache.update(tenant, id, casted);

        return casted;
      });
  },
  upsert: (tenant: ClientTenant["id"], products: Product[]) => {
    const batch = database.batch();

    const commited = products.map((product) => {
      if (product.id) {
        const {id, ...formatted} = schemas.server.update.cast(product);

        batch.update(
          database.collection("tenants").doc(tenant).collection("products").doc(id),
          formatted,
        );

        return {id, ...formatted};
      } else {
        const formatted = schemas.server.create.cast(product);
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
