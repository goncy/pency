import React, {Suspense} from "react";
import {initReactI18next, I18nextProvider} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import i18n from "./instance";
import dictionaries from "./dictionaries";
import {LOCALES, DEFAULT_COUNTRY} from "./constants";

interface Props {
  country?: string;
  detect?: boolean;
}

const I18nProvider: React.FC<Props> = ({children, country, detect = false}) => {
  React.useEffect(() => {
    i18n
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        detection: {
          order: detect ? ["querystring"] : [],
        },
        resources: dictionaries,
        lng: LOCALES[country],
        fallbackLng: LOCALES[DEFAULT_COUNTRY],
        interpolation: {
          escapeValue: false,
        },
      });
  }, [country, detect]);

  return (
    <I18nextProvider i18n={i18n}>
      {process.browser ? <Suspense fallback={null}>{children}</Suspense> : null}
    </I18nextProvider>
  );
};

export {I18nProvider as Provider};
