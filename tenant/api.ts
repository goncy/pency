import {Tenant} from "./types";

import fetch from "~/utils/fetch";

export default {
  fetch: (slug: Tenant["slug"]) => fetch("GET", `/tenant?slug=${slug}`),
  update: (tenant: Tenant) => fetch("PATCH", `/tenant?tenant=${tenant.id}`, {tenant}),
};
