/* Core */
import {
  configureStore,
  type ThunkAction,
  type Action,
  type Reducer,
  type Middleware,
} from "@reduxjs/toolkit";
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  type TypedUseSelectorHook,
} from "react-redux";

export const store: any = (reducer: Reducer, middleware: Middleware) =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(middleware);
    },
  });

export const useDispatch = () => useReduxDispatch<ReduxDispatch>();
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;

/* Types */
export type ReduxStore = typeof store;
export type ReduxState = ReturnType<typeof store.getState>;
export type ReduxDispatch = typeof store.dispatch;
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  Action
>;
