import * as R from "ramda";

import {ClientTenant, ServerTenant} from "./types";

export function serverToClient(tenant: Partial<ServerTenant>): Partial<ClientTenant> {
  return R.pipe(
    R.pick([
      "id",
      "slug",
      "category",
      "color",
      "phone",
      "logo",
      "title",
      "instagram",
      "facebook",
      "twitter",
      "keywords",
      "banner",
      "description",
      "highlight",
      "fields",
      "mercadopago",
    ]),
    R.evolve({
      mercadopago: (mercadopago) => Boolean(mercadopago.token),
    }),
  )(tenant);
}

export function clientToServer(tenant: Partial<ClientTenant>): Partial<ServerTenant> {
  return R.omit(["id", "mercadopago"], tenant);
}
