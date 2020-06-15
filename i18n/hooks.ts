import {useTranslation as useReactI18nextTranslation} from "react-i18next";

export function useTranslation() {
  const {t} = useReactI18nextTranslation();

  return t;
}
