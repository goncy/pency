import {Product} from "../types";

import {ClientTenant} from "~/tenant/types";
import fetch from "~/utils/fetch";

export default {
  list: (tenant: ClientTenant["id"]) => fetch("GET", `/api/product/${tenant}`),
  create: (tenant: ClientTenant["id"], product: Product) =>
    fetch(
      "POST",
      `/api/product/${tenant}`,
      {product},
      {
        Authorization: window.localStorage.getItem("token"),
      },
    ),
  remove: (tenant: ClientTenant["id"], product: Product["id"]) =>
    fetch("DELETE", `/api/product/${tenant}?product=${product}`, null, {
      Authorization: window.localStorage.getItem("token"),
    }),
  update: (tenant: ClientTenant["id"], product: Partial<Product>) =>
    fetch(
      "PATCH",
      `/api/product/${tenant}`,
      {product},
      {
        Authorization: window.localStorage.getItem("token"),
      },
    ),
  upsert: (tenant: ClientTenant["id"], products: Partial<Product>[]): Promise<Product[]> =>
    fetch(
      "PUT",
      `/api/product/${tenant}`,
      {products},
      {
        Authorization: window.localStorage.getItem("token"),
      },
    ),
};
