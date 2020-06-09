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
    return database
      .collection("tenants")
      .doc(tenant)
      .collection("products")
      .add(formatProduct(product))
      .then((snapshot) => {
        const parsed: Product = {...product, id: snapshot.id};

        cache.add(tenant, parsed);

        console.log(`Cache added for products ${tenant}`);

        return parsed;
      });
  },
  remove: (tenant: ClientTenant["id"], product: Product["id"]) => {
    cache.pluck(tenant, product);

    console.log(`Cache plucked for products ${tenant}`);

    return database.collection("tenants").doc(tenant).collection("products").doc(product).delete();
  },
  update: (tenant: ClientTenant["id"], {id, ...product}: Product) => {
    const formated = formatProduct(product);

    cache.update(tenant, id, formated);

    console.log(`Cache updated for products ${tenant}`);

    return database
      .collection("tenants")
      .doc(tenant)
      .collection("products")
      .doc(id)
      .update(formated);
  },
};
