import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";

interface Props {
  lng: "vi" | "en" | string;
  resources: {
    [key: string]: {
      translation: Record<string, string>;
    };
  };
}

const i18next = (props: Props) => {
  const { lng = "vi", resources } = props;
  return i18n
    .use(HttpApi)
    .use(initReactI18next)
    .init({
      lng: lng,
      fallbackLng: lng,
      debug: true,
      backend: {
        loadPath: "https://example.com/locales/{{lng}}.json",
      },
      resources: resources,
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
    });
};

export default i18next;
