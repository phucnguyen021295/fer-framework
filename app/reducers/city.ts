import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { concat, merge, union, unionBy } from "lodash";
import { cityApi } from "../apis/city";

export interface CityState {}

const initialState: CityState = [];

export const citySlide = createSlice({
  name: "city",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(cityApi.endpoints.getListCity.matchPending, (state) => {})
      .addMatcher(
        cityApi.endpoints.getListCity.matchFulfilled,
        (state, action: any) => {
          const { items } = action.payload;
          return unionBy(items, state, 'id')
        }
      )
      .addMatcher(
        cityApi.endpoints.getListCity.matchRejected,
        (state, action) => {}
      );
  },
  selectors: {
    getCityNameByAirportCode: (state, airportCode) => state.filter((item) => item.airportCode === airportCode)
  },
});

// Action creators are generated for each case reducer function
export const cityActions = citySlide.actions;

export const citySelectors = citySlide.selectors;

export default citySlide.reducer;
