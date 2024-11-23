import { baseApi, postBaseApi, getBaseApi } from "@/fe-base/apis";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMinFareFlightBooking: getBaseApi<{ from_time: number; to_time: number, route: string }>(
      '/airagent/api/v1/flight/min-fare',
      builder
    ),

    getFlightClassBooking: getBaseApi<{}>(
      '/airagent/api/v1/flight-class/select',
      builder
    ),
  }),
});

export const { useGetMinFareFlightBookingQuery, useGetFlightClassBookingQuery } = bookingApi;
