import {ClientTenant} from "../types";

import fetch from "~/utils/fetch";

export default {
  fetch: (slug: ClientTenant["slug"]) => fetch("GET", `/api/tenant?slug=${slug}`),
  update: (tenant: ClientTenant) => fetch("PATCH", `/api/tenant?tenant=${tenant.id}`, {tenant}),
};
