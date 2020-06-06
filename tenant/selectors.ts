import * as R from "ramda";

import {ClientTenant, ServerTenant, Field} from "./types";

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
  return R.omit(["id", "mercadopago", "slug"], tenant);
}

export function isMercadoPagoSelected(fields?: Field[]): boolean {
  if (!Boolean(fields?.length)) return false;

  const regexp = new RegExp(/mercado(\s{1})?pago/gim);

  return fields.some((field) => field.value?.match(regexp));
}
