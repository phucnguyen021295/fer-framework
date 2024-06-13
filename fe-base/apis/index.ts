// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from "js-cookie";

// initialize an empty api service that we'll inject endpoints into later as needed
export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
     baseUrl: process.env.URL_SERVER, // 'https://smartindustrial.rox.vn/api/v1',
     prepareHeaders: (headers, { getState, endpoint }) => {
      const token = Cookies.get("token");
      if (!!token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
     }),
  endpoints: () => ({}),
})