import {Tenant} from "./types";

import fetch from "~/utils/fetch";

export default {
  fetch: (slug: Tenant["slug"]) => fetch("GET", `/api/tenant?slug=${slug}`),
  update: (tenant: Tenant) => fetch("PATCH", `/api/tenant?tenant=${tenant.id}`, {tenant}),
};
