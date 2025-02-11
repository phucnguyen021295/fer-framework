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

export const initI18n = (props: Props) => {
  const { lng = "vi", resources } = props;
  i18n
    .use(LanguageDetector) // Phát hiện ngôn ngữ của user
    .use(initReactI18next) // Kết nối với React
    .init({
      lng: lng,
      fallbackLng: lng,
      debug: true,
      resources,
      interpolation: {
        escapeValue: false, // Không cần escape khi dùng HTML
      },
    });

  return i18n;
};

export default i18n;
