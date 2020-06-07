import {Product} from "../types";
import {parseProduct, formatProduct} from "../selectors";

import {database} from "~/firebase/admin";
import {ClientTenant} from "~/tenant/types";

export default {
  list: async (tenant: ClientTenant["id"]): Promise<Product[]> =>
    database
      .collection("tenants")
      .doc(tenant)
      .collection("products")
      .get()
      .then((snapshot) => snapshot.docs.map((doc) => ({...(doc.data() as Product), id: doc.id})))
      .then((products) => products.map(parseProduct)),
  create: (tenant: ClientTenant["id"], product: Product) =>
    database
      .collection("tenants")
      .doc(tenant)
      .collection("products")
      .add(formatProduct(product))
      .then((snapshot) => ({...formatProduct(product), id: snapshot.id})),
  remove: (tenant: ClientTenant["id"], product: Product["id"]) =>
    database.collection("tenants").doc(tenant).collection("products").doc(product).delete(),
  update: (tenant: ClientTenant["id"], {id, ...product}: Product) =>
    database
      .collection("tenants")
      .doc(tenant)
      .collection("products")
      .doc(id)
      .update(formatProduct(product)),
};
