import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../../translations/en.json";
import fr from "../../translations/fr.json";
import kr from "../../translations/kr.json";

const resources = {
  en: { translation: en },
  fr: { translation: fr },
  ko: { translation: kr },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;