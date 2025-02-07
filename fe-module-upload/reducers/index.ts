import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {merge} from 'lodash';

// Define a type for the slice state
interface uploadState {}

// Define the initial state using that type
const initialState: uploadState = {};

export const extraUploadReducers = builder => {};

export const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{token: string}>) => {
      state.token = action.payload.token;
    },
  },
  extraReducers: builder => extraUploadReducers(builder),
  selectors: {
    getToken: state => state.token,

    getMe: state => state.me,

    getExpired: state => state.expired,
  },
});

export const uploadActions = uploadSlice.actions;

export const uploadSelectors = uploadSlice.selectors;

// Other code such as selectors can use the imported `RootState` type
export default uploadSlice.reducer;
