import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslations from "./locales/en/translation.json";
import mmTranslations from "./locales/mm/translation.json";


// Translations
const resources = {
  en_us: { translation: enTranslations },
  my_mm: { translation: mmTranslations },
};

i18n
  .use(LanguageDetector) // Detect browser language
  .use(initReactI18next) // Pass i18n to React
  .init({
    resources,
    fallbackLng: "en_us", // Default language
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
