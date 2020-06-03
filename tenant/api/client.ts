import {ClientTenant} from "../types";

import fetch from "~/utils/fetch";

export default {
  update: (tenant: ClientTenant) => fetch("PATCH", `/api/tenant/${tenant.slug}`, {tenant}),
};
