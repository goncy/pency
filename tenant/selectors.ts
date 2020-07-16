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

export function getRevalidationTime(tier: ClientTenant["tier"]): number {
  switch (tier) {
    case "free": {
      // Current date
      const now = new Date();

      // Seconds until tomorrow
      const secondsUntilTomorrow =
        24 * 60 * 60 - now.getHours() * 60 * 60 - now.getMinutes() * 60 - now.getSeconds();

      // If deployed near midnight, deploy tomorrow otherwise deploy on specified time
      return secondsUntilTomorrow < 3600 ? secondsUntilTomorrow + 86400 : secondsUntilTomorrow;
    }

    case "entrepreneur": {
      // Seconds until next hour
      return Math.round(3600000 - (new Date().getTime() % 3600000)) / 1000;
    }

    case "commercial": {
      // 10 seconds
      return 10;
    }

    default: {
      // 12 hours
      return 43200;
    }
  }
}
