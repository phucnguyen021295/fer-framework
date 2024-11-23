import { baseApi, postBaseApi, getBaseApi } from "@/fe-base/apis";

export const cityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getListCity: getBaseApi<{region_id: number, page: number, page_size: number}>("/airagent/api/v1/city/select", builder),
  }),
});

export const { useGetListCityQuery } = cityApi;
