import { baseApi, postBaseApi, getBaseApi } from "@/fe-base/apis";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postLogin: postBaseApi<{ username: string; password: number }, {rememberMe: boolean}>(
      process.env.URL_API.AUTH.POST_LOGIN,
      builder
    ),

    getMeAuth: getBaseApi<{}>(
      process.env.URL_API.AUTH.GET_ME,
      builder
    ),
  }),
});

export const { usePostLoginMutation, useLazyGetMeAuthQuery } = authApi;
