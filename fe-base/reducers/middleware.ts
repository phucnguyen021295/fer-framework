/* Core */
import { createLogger } from "redux-logger";
import {concat} from 'lodash';
import {
  type Middleware
} from "@reduxjs/toolkit";

const middleware = (arr: Middleware[]) => concat([
  createLogger({
    duration: true,
    timestamp: false,
    collapsed: true,
    colors: {
      title: () => "#139BFE",
      prevState: () => "#1C5FAF",
      action: () => "#149945",
      nextState: () => "#A47104",
      error: () => "#ff0005",
    },
    predicate: () => typeof window !== "undefined",
  })
], arr);

export { middleware };
