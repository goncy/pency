import {Product} from "../types";

import {ClientTenant} from "~/tenant/types";
import fetch from "~/utils/fetch";

export default {
  list: (tenant: ClientTenant["id"]) => fetch("GET", `/api/product?tenant=${tenant}`),
  create: (tenant: ClientTenant["id"], product: Product) =>
    fetch("POST", `/api/product?tenant=${tenant}`, {product}),
  remove: (tenant: ClientTenant["id"], product: Product["id"]) =>
    fetch("DELETE", `/api/product?tenant=${tenant}&product=${product}`),
  update: (tenant: ClientTenant["id"], product: Partial<Product>) =>
    fetch("PATCH", `/api/product?tenant=${tenant}`, {product}),
  upsert: (tenant: ClientTenant["id"], products: Partial<Product>[]): Promise<Product[]> =>
    fetch("PUT", `/api/product?tenant=${tenant}`, {products}),
};
