import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface authState {
  token: string;
}

// Define the initial state using that type
const initialState: authState = {
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{token: string}>) => {
      state.token = action.payload.token;
    },
  },
});

export const authActions = authSlice.actions;

export const authSelectors = authSlice.selectors;

// Other code such as selectors can use the imported `RootState` type
export default authSlice.reducer;
