import fetch from "isomorphic-unfetch";

import firebase from "../firebase/client";
import {Tenant} from "../tenant/types";

import {Product} from "./types";

export default {
  list: (tenant: Tenant["id"]) =>
    fetch(`${process.env.BASE_URL}/api/product?tenant=${tenant}`).then((res) =>
      res.ok ? res.json() : Promise.reject(res.status),
    ),
  create: (tenant: Tenant["id"], product: Product) =>
    firebase.database
      .collection("tenants")
      .doc(tenant)
      .collection("products")
      .add(product)
      .then((snapshot) => ({...product, id: snapshot.id})),
  remove: (tenant: Tenant["id"], product: Product["id"]) =>
    firebase.database
      .collection("tenants")
      .doc(tenant)
      .collection("products")
      .doc(product)
      .delete(),
  update: (tenant: Tenant["id"], product: Product) =>
    firebase.database
      .collection("tenants")
      .doc(tenant)
      .collection("products")
      .doc(product.id)
      .update(product),
};
