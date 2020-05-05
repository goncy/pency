import {Product} from "./types";

import {Tenant} from "~/tenant/types";
import fetch from "~/utils/fetch";

export default {
  list: (tenant: Tenant["id"]) => fetch("GET", `/api/product?tenant=${tenant}`),
  create: (tenant: Tenant["id"], product: Product) =>
    fetch("POST", `/api/product?tenant=${tenant}`, {product}),
  remove: (tenant: Tenant["id"], product: Product["id"]) =>
    fetch("DELETE", `/api/product?tenant=${tenant}&product=${product}`),
  update: (tenant: Tenant["id"], product: Product) =>
    fetch("PATCH", `/api/product?tenant=${tenant}`, {product}),
};
