import { baseApi, postBaseApi, getBaseApi } from "@/fe-base/apis";

export const searchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchFlight: postBaseApi<{
      body: {
        adultCount: number;
        childCount: number;
        infantCount: number;
        routes: {
          routeNo: number;
          startPoint: string;
          endPoint: string;
          departDate: number;
        }[];
        classCode: string;
        tripType: "OW" | "RT" | "MC";
      };
    }>("/airagent/api/v1/flight/search", builder),
  }),
});

export const { useSearchFlightMutation } = searchApi;
