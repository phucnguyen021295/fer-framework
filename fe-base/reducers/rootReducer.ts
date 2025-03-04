/* Instruments */
import { combineReducers } from "redux";

// Base APi
import { baseApi } from "../apis";

export const createReducer = (_reducer: any) =>
  combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    ..._reducer,
  });
