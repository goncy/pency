import {Field, ClientTenant} from "./types";
import schemas from "./schemas";

export function isMercadoPagoSelected(fields?: Field[]): boolean {
  if (!Boolean(fields?.length)) return false;

  const regexp = new RegExp(/mercado(\s{1})?pago/gim);

  return fields.some((field) => field.value?.match(regexp));
}

export function filterByRelevant(tenants: ClientTenant[]): ClientTenant[] {
  return tenants.filter((tenant) => schemas.client.relevant.isValidSync(tenant));
}
