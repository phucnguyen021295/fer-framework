import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../apis";

// Define a type for the slice state
interface authState {
  token: string;
  me: any;
}

// Define the initial state using that type
const initialState: authState = {
  token: "",
  me: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{token: string}>) => {
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.getMeAuth.matchFulfilled,
      (state, action: any) => {
        state.me = action.payload;
      }
    );
  },
  selectors: {
    getToken: (state) => state.token,

    getMe: (state) => state.me,
  }
});

export const authActions = authSlice.actions;

export const authSelectors = authSlice.selectors;

// Other code such as selectors can use the imported `RootState` type
export default authSlice.reducer;
