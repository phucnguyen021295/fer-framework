"use client";

/* Core */
import React from "react";
import { Provider } from "react-redux";

/* Instruments */
import { store } from "./index";

export const ProviderRedux = (props: React.PropsWithChildren) => {
  return <Provider store={store}>{props.children}</Provider>;
};
