import {Field, ClientTenant} from "./types";

import dates from "~/utils/date";

export function isMercadoPagoSelected(fields?: Field[]): boolean {
  if (!Boolean(fields?.length)) return false;

  const regexp = new RegExp(/mercado(\s{1})?pago/gim);

  return fields.some((field) => field.value?.match(regexp));
}

export function getRevalidationTime(tier: ClientTenant["tier"]): number {
  switch (tier) {
    case "free": {
      // Time until next day
      return dates.secondsUntilNextDay;
    }

    case "preferential": {
      // Seconds until next hour
      return dates.secondsUntilNextHour;
    }

    case "commercial": {
      // 10 seconds
      return 10;
    }

    default: {
      // 12 hours
      return dates.twelveHoursInSeconds;
    }
  }
}
