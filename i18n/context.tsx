import React from "react";
import i18n from "i18next";
import {initReactI18next, I18nextProvider} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import dictionaries from "./dictionaries";

const instance = i18n.use(LanguageDetector).use(initReactI18next);

const I18nProvider: React.FC = ({children}) => {
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (process.browser && !i18n.isInitialized) {
      instance
        .init({
          resources: dictionaries,
          fallbackLng: "es",
          interpolation: {
            escapeValue: false,
          },
        })
        .then(() => setLoading(false));
    }
  }, []);

  if (isLoading) return null;

  return <I18nextProvider i18n={instance}>{children}</I18nextProvider>;
};

export {I18nProvider as Provider};
