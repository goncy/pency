import {Tenant} from "../tenant/types";

import {Product} from "./types";

import fetch from "~/utils/fetch";

export default {
  list: (tenant: Tenant["id"]) => fetch("GET", `/product?tenant=${tenant}`),
  create: (tenant: Tenant["id"], product: Product) =>
    fetch("POST", `/product?tenant=${tenant}`, {product}),
  remove: (tenant: Tenant["id"], product: Product["id"]) =>
    fetch("DELETE", `/product?tenant=${tenant}&product=${product}`),
  update: (tenant: Tenant["id"], product: Product) =>
    fetch("PATCH", `/product?tenant=${tenant}`, {product}),
};
