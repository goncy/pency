import {useTranslation as useReactI18nextTranslation} from "react-i18next";

import {formatPrice} from "./selectors";

export function useTranslation() {
  const {t} = useReactI18nextTranslation();

  return t;
}

export function usePrice() {
  return formatPrice;
}
