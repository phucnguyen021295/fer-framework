import { baseApi, postBaseApi, getBaseApi } from "@/fe-base/apis";

export const regionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRegion: getBaseApi("/airagent/api/v1/region/select", builder),
  }),
});

export const { useGetRegionQuery } = regionApi;
