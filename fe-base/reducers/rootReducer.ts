/* Instruments */
import { combineReducers } from 'redux';

// Base APi
import { baseApi } from "@/fe-base/apis";

export const createReducer = (_reducer: any) => combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  ..._reducer
});

// export const reducer = (state: any, action: any) => appReducer(state, action);