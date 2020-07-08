import * as yup from "yup";

import {Field, ClientTenant} from "./types";

export function isMercadoPagoSelected(fields?: Field[]): boolean {
  if (!Boolean(fields?.length)) return false;

  const regexp = new RegExp(/mercado(\s{1})?pago/gim);

  return fields.some((field) => field.value?.match(regexp));
}

export function filterByRelevant(tenants: ClientTenant[]): ClientTenant[] {
  const schema = yup.object<Partial<ClientTenant>>({
    id: yup.string().required(),
    slug: yup.string().required(),
    category: yup.string().required(),
    logo: yup.string().required(),
    phone: yup.string().required().notOneOf(["5491173694572"]),
    description: yup.string().notOneOf(["Armá tu tienda y recibí los pedidos via WhatsApp"]),
    title: yup.string().notOneOf(["Pency - Tu tienda online fácil"]).required(),
  });

  return tenants.filter((tenant) => schema.isValidSync(tenant));
}
