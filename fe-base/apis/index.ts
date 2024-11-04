// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "cookies-next";

// initialize an empty api service that we'll inject endpoints into later as needed
export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.URL_SERVER, // 'https://smartindustrial.rox.vn',
    prepareHeaders: (headers, { getState, endpoint }) => {
      headers.set("Content-Type", "application/json");
      const token = getCookie("token");
      if (!!token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
