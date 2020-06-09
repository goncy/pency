import {Product} from "../types";
import {parseProduct, formatProduct} from "../selectors";
import cache from "../cache";

import {database} from "~/firebase/admin";
import {ClientTenant} from "~/tenant/types";

export default {
  list: async (tenant: ClientTenant["id"]): Promise<Product[]> => {
    const cached = cache.get(tenant);

    console.log(
      cached
        ? `Cached product response for ${tenant}`
        : `Not cached product response for ${tenant}`,
    );

    return (
      cached ||
      database
        .collection("tenants")
        .doc(tenant)
        .collection("products")
        .get()
        .then((snapshot) => snapshot.docs.map((doc) => ({...(doc.data() as Product), id: doc.id})))
        .then((products) => {
          const parsed = products.map(parseProduct);

          cache.set(tenant, parsed);

          return parsed;
        })
    );
  },
  create: (tenant: ClientTenant["id"], product: Product) => {
    cache.delete(tenant);

    console.log(`Cache cleaned for products ${tenant}`);

    return database
      .collection("tenants")
      .doc(tenant)
      .collection("products")
      .add(formatProduct(product))
      .then((snapshot) => ({...formatProduct(product), id: snapshot.id}));
  },
  remove: (tenant: ClientTenant["id"], product: Product["id"]) => {
    cache.delete(tenant);

    console.log(`Cache cleaned for products ${tenant}`);

    return database.collection("tenants").doc(tenant).collection("products").doc(product).delete();
  },
  update: (tenant: ClientTenant["id"], {id, ...product}: Product) => {
    cache.delete(tenant);

    console.log(`Cache cleaned for products ${tenant}`);

    return database
      .collection("tenants")
      .doc(tenant)
      .collection("products")
      .doc(id)
      .update(formatProduct(product));
  },
};
