import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

interface Props {
  lng: "vi" | "en" | string;
  resources: {
    [key: string]: {
      translation: Record<string, string>;
    };
  };
}

i18n
  .use(LanguageDetector) // Phát hiện ngôn ngữ của user
  .use(initReactI18next) // Kết nối với React
  .init({
    lng: "vi",
    fallbackLng: "vi",
    debug: true,
    interpolation: {
      escapeValue: false, // Không cần escape khi dùng HTML
    },
  });

export default i18n;
