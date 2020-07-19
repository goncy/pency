import shortid from "shortid";
import {firestore} from "firebase-admin";

import {Product} from "../types";
import schemas from "../schemas";

import {database} from "~/firebase/admin";
import {ClientTenant} from "~/tenant/types";

export default {
  list: async (tenant: ClientTenant["id"]): Promise<Product[]> => {
    console.log("IMPACTED PRODUCTS");

    return database
      .collection("tenants")
      .doc(tenant)
      .collection("products")
      .get()
      .then((snapshot) => snapshot.docs.map((doc) => ({...(doc.data() as Product), id: doc.id})))
      .then((products) => {
        // @TODO: Remove once type is widely adopted
        const parsed = products.map((product) =>
          schemas.client.fetch.cast({
            ...product,
            type:
              product.available === false
                ? "unavailable"
                : product.originalPrice
                ? "promotional"
                : product.visibility || product.type,
          }),
        );

        return parsed;
      });
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
      .then(() => product),
  update: (tenant: ClientTenant["id"], {id, ...product}: Product) => {
    const casted = schemas.server.update.cast(product);

    return database
      .collection("tenants")
      .doc(tenant)
      .collection("products")
      .doc(id)
      .update({
        ...casted,
        // @TODO: Remove once type is widely adopted
        available: firestore.FieldValue.delete(),
        visibility: firestore.FieldValue.delete(),
      })
      .then(() => casted);
  },
  upsert: (tenant: ClientTenant["id"], products: Product[]) => {
    const batch = database.batch();

    products.forEach((product) => {
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

    return batch.commit().then(() => products);
  },
};
