import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { merge } from "lodash";

export interface UIState {}

const initialState: UIState = {
  searchFlights: {
    adultCount: 1,
    childCount: 0,
    infantCount: 0,
    routes: [
      {
        routeNo: 0,
        startPoint: "",
        endPoint: "",
        departDate: 0,
      },
      {
        routeNo: 1,
        startPoint: "",
        endPoint: "",
        departDate: 0,
      },
      //   {
      //     routeNo: 2,
      //     startPoint: "SGN",
      //     endPoint: "HAN",
      //     departDate: 1734806800000, // 10/12
      //   },
    ],
    classCode: "", // lấy ở danh sách hạng máy bay
    tripType: "RT", // OW, RT, MC
  },
};

export const uiSlide = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSearchFlights: (state, action: PayloadAction<object>) => {
      state.searchFlights = merge(state.searchFlights, action.payload);
    },

    setTripType: (state, action: PayloadAction<object>) => {
      const data = action.payload;
      if (data.tripType === "OW") {
        state.searchFlights.routes.splice(1);
        return;
      }

      if (data.tripType === "RT") {
        const route0 = state.searchFlights.routes[0];
        const route1 = {
          routeNo: 1,
          startPoint: route0.endPoint,
          endPoint: route0.startPoint,
          departDate: 0,
        };
        state.searchFlights.routes.splice(1);
        state.searchFlights.routes.push(route1);
        return;
      }

      if (data.tripType === "MC") {
        const route1 = {
          routeNo: 1,
          startPoint: "",
          endPoint: "",
          departDate: 0,
        };
        state.searchFlights.routes.splice(1);
        state.searchFlights.routes.push(route1);
        return;
      }
    },

    setCalendarFlights: (state, action: PayloadAction<object>) => {
      const data = action.payload;
      // Trường hợp một chiều thì sẽ chỉ set route 0
      if (data.tripType === "OW") {
        if (data.startPoint) {
          state.searchFlights.routes[0].startPoint = data.startPoint;
        }

        if (data.endPoint) {
          state.searchFlights.routes[0].endPoint = data.endPoint;
        }

        if (data.startDate) {
          state.searchFlights.routes[0].departDate = data.startDate;
        }
        return;
      }

      // Trường hợp khứ hồi thì sẽ set cả 2 chiều route 0 và 1
      if (data.tripType === "RT") {
        if (data.startPoint) {
          state.searchFlights.routes[0].startPoint = data.startPoint;
          state.searchFlights.routes[1].endPoint = data.startPoint;
        }

        if (data.endPoint) {
          state.searchFlights.routes[0].endPoint = data.endPoint;
          state.searchFlights.routes[1].startPoint = data.endPoint;
        }

        if (data.startDate && data.endDate) {
          state.searchFlights.routes[0].departDate = data.startDate;
          state.searchFlights.routes[1].departDate = data.endDate;
        }
        return;
      }

      // Trường hơp đa hành trinh
      if (data.startPoint) {
        state.searchFlights.routes[data?.routeNo].startPoint = data.startPoint;
      }

      if (data.endPoint) {
        state.searchFlights.routes[data?.routeNo].endPoint = data.endPoint;
      }

      if (data.startDate) {
        state.searchFlights.routes[data?.routeNo].departDate = data.startDate;
      }
    },

    addRouteByMC: (state, action: PayloadAction<object>) => {
      const numberRoute = state.searchFlights.routes.length;
      const route1 = {
        routeNo: numberRoute,
        startPoint: "",
        endPoint: "",
        departDate: 0,
      };
      state.searchFlights.routes.push(route1);
    },

    remoteRouteByMC: (state, action: PayloadAction<object>) => {
      const { routeNo } = action.payload;
      state.searchFlights.routes = state.searchFlights.routes.filter((_, index) => index !== routeNo);

      state.searchFlights.routes = state.searchFlights.routes.map((item, index) => ({...item, routeNo: index}))
    },
  },
  selectors: {
    getSearchFlights: (state) => state.searchFlights,

    getTripType: (state) => state.searchFlights.tripType,

    getNumberPassenger: (state) => ({
      adultCount: state.searchFlights.adultCount,
      childCount: state.searchFlights.childCount,
      infantCount: state.searchFlights.infantCount,
    }),

    getClassCodee: (state) => state.searchFlights.classCode,

    getRoute: (state, routeNo = 0) => {
      const item = state.searchFlights.routes[routeNo];
      return `${item.startPoint}-${item.endPoint}`;
    },

    getStartDate: (state, routeNo = 0) => {
      const item = state.searchFlights.routes[routeNo];
      return item?.departDate;
    },

    getEndDate: (state) => {
      const item = state.searchFlights.routes[1];
      return item?.departDate;
    },

    getPoint: (state, routeNo = 0) => state.searchFlights.routes[routeNo],

    getNumberRoute: (state, tripType) => {
      if (tripType === "OW" || tripType === "RT") {
        return [0];
      }

      return [...state.searchFlights.routes.map((route, index) => index)];
    },
  },
});

// Action creators are generated for each case reducer function
export const uiActions = uiSlide.actions;

export const uiSelectors = uiSlide.selectors;

export default uiSlide.reducer;
