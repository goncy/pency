import React from "react";
import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import * as dictionaries from "./dictionaries";

const I18nContext = React.createContext({});

const I18nProvider: React.FC = ({children}) => {
  const state = {
    dictionaries,
  };

  React.useEffect(() => {
    i18n
      .use(initReactI18next)
      .use(LanguageDetector)
      .init({
        resources: dictionaries,
        fallbackLng: "es",
        interpolation: {
          escapeValue: false,
        },
      });
  }, []);

  return <I18nContext.Provider value={{state}}>{children}</I18nContext.Provider>;
};

export {I18nProvider as Provider, I18nContext as default};
