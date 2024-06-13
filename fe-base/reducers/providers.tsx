"use client";

/* Core */
import { Provider } from "react-redux";

/* Instruments */
import { reduxStore } from "./index";

export const ProviderRedux = (props: React.PropsWithChildren) => {
  return <Provider store={reduxStore}>{props.children}</Provider>;
};
