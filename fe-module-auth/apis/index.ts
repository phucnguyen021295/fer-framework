import { baseApi, postBaseApi } from "@/fe-base/apis";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postLogin: postBaseApi<{ username: string; password: number }, {rememberMe: boolean}>(
      process.env.URL_API.AUTH.POST_LOGIN,
      builder
    ),
  }),
});

export const { usePostLoginMutation } = authApi;
