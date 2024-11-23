/* Instruments */
import { combineReducers } from 'redux';

// Base APi
import { baseApi } from "@/fe-base/apis";

export const createReducer = (_reducer: any) => combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  ..._reducer
});
