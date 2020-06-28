import i18n from "./instance";
import {CURRENCIES, LOCALES, DEFAULT_COUNTRY} from "./constants";

export function formatPrice(price: number, _country?: string) {
  let country = _country;

  if (!country) {
    const locale = i18n?.language;

    if (!locale) {
      country = DEFAULT_COUNTRY;
    } else {
      const result = Object.entries(LOCALES).find(([, _locale]) => locale === _locale);

      country = result?.[0] || DEFAULT_COUNTRY;
    }
  }

  return Number(price).toLocaleString(LOCALES[country], {
    style: "currency",
    currency: CURRENCIES[country],
  });
}
