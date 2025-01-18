import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../apis";
import { AUTH_ACTION } from "@/fe-base/actions";
import { merge } from "lodash";

// Define a type for the slice state
interface authState {
  token: string;
  me: any;
  expired: boolean;
}

// Define the initial state using that type
const initialState: authState = {
  token: "",
  me: null,
  expired: false,
};

export const extraAuthReducers = (builder) => {
  // Kịch bản logout
  builder.addCase(AUTH_ACTION.LOGOUT, (state: any) => {
    // Khi fetchData đang pending
    return merge(state, initialState);
  });

  // Kịch bản hệt hạn token
  builder.addCase(AUTH_ACTION.EXPIRED, (state: any) => {
    // Khi fetchData đang pending
    state.expired = true;
  });

  // Kịch bản refesh token
  builder.addCase(
    AUTH_ACTION.TOKEN_RECEIVED,
    (state: any, action: PayloadAction) => {
      // Khi fetchData đang pending
      return merge(state, action.payload);
    }
  );

  builder.addMatcher(
    authApi.endpoints.getMeAuth.matchFulfilled,
    (state, action: any) => {
      state.me = action.payload;
    }
  );
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },

    updateExpired: (state, action: PayloadAction<{ expired: boolean }>) => {
      state.expired = action.payload.expired;
    },
  },
  extraReducers: (builder) => extraAuthReducers(builder),
  selectors: {
    getToken: (state) => state.token,

    getMe: (state) => state.me,

    getExpired: (state) => state.expired,
  },
});

export const authActions = authSlice.actions;

export const authSelectors = authSlice.selectors;

// Other code such as selectors can use the imported `RootState` type
export default authSlice.reducer;
