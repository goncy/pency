import i18n from "./instance";
import {CURRENCIES, LOCALES, DEFAULT_COUNTRY} from "./constants";

export function formatPrice(price: number, format: "locale" | "iso" = "locale") {
  const locale = i18n?.language || LOCALES[DEFAULT_COUNTRY];
  const result = Object.entries(LOCALES).find(([, _locale]) => locale === _locale);

  const country = result?.[0] || DEFAULT_COUNTRY;

  switch (format) {
    case "iso": {
      return `${Number(price).toFixed(2)} ${CURRENCIES[country]}`;
    }

    case "locale":
    default: {
      return Number(price).toLocaleString(LOCALES[country], {
        style: "currency",
        currency: CURRENCIES[country],
      });
    }
  }
}
