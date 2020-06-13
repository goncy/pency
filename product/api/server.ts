import {Product} from "../types";
import {parseProduct, formatProduct} from "../selectors";
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
          const parsed = products.map(parseProduct);

          cache.set(tenant, parsed);

          return parsed;
        })
    );
  },
  create: (tenant: ClientTenant["id"], product: Product) =>
    database
      .collection("tenants")
      .doc(tenant)
      .collection("products")
      .add(formatProduct(product))
      .then((snapshot) => {
        const parsed: Product = {...product, id: snapshot.id};

        cache.add(tenant, parsed);

        return parsed;
      }),
  remove: (tenant: ClientTenant["id"], product: Product["id"]) =>
    database
      .collection("tenants")
      .doc(tenant)
      .collection("products")
      .doc(product)
      .delete()
      .then(() => cache.pluck(tenant, product)),
  update: (tenant: ClientTenant["id"], {id, ...product}: Product) => {
    const formated = formatProduct(product);

    return database
      .collection("tenants")
      .doc(tenant)
      .collection("products")
      .doc(id)
      .update(formated)
      .then(() => cache.update(tenant, id, formated));
  },
};
