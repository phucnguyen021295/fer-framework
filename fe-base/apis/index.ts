// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import {
  createApi,
  fetchBaseQuery,
  EndpointBuilder,
  BaseQueryFn,
  FetchBaseQueryError,
  FetchArgs,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import {
  getToken,
  getRefreshToken,
  getOrganizationCode,
} from "../utils/getToken";
import { AUTH_ACTION } from "../actions";

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.URL_SERVER,
  prepareHeaders: (headers, { getState, endpoint }) => {
    headers.set("Content-Type", "application/json");
    const state = getState();
    const token = getToken(state);
    const organizationCode = getOrganizationCode(state);
    if (!!token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    if (!!organizationCode) {
      headers.set("organizationCode", `${organizationCode}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshToken = getRefreshToken(api.getState());
        const urlApi =
          typeof process.env.URL_API === "string"
            ? JSON.parse(process.env.URL_API)
            : {};
        const refreshTokenUrl = urlApi?.AUTH?.AUTH_URL_REFRESH_TOKEN || "";
        const refreshResult = await baseQuery(
          {
            url: refreshTokenUrl,
            method: "POST",
            body: { refreshToken },
          },
          api,
          extraOptions
        );
        if (refreshResult.data) {
          api.dispatch({
            type: AUTH_ACTION.TOKEN_RECEIVED,
            payload: refreshResult.data,
          });
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch({ type: AUTH_ACTION.EXPIRED });
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

// initialize an empty api service that we'll inject endpoints into later as needed
export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: JSON.parse(process.env.TAG_TYPES || "[]"),
});

// Hàm `getBaseApi` nhận vào `builder` và định nghĩa một endpoint `query`
export const getBaseApi = <TParams extends Record<string, any>>(
  url: string,
  builder: EndpointBuilder<BaseQueryFn, any, any>,
  partial?: Partial<ReturnType<typeof builder.query>>
) =>
  builder.query<any, TParams>({
    query: (params: TParams) => ({
      url,
      method: "GET",
      ...(params ? { params } : {}),
    }),
    transformResponse: (response: { data: any }, meta, arg) => response.data,
    ...((partial ?? {}) as any),
  });

// Hàm `postBaseApi` nhận vào `builder` và định nghĩa một endpoint `mutation`
export const postBaseApi = <TBody>(
  url: string,
  builder: EndpointBuilder<BaseQueryFn, any, any>,
  partial?: Partial<ReturnType<typeof builder.mutation>>
) =>
  builder.mutation<any, TBody>({
    query: (body: TBody) => ({
      url,
      method: "POST",
      body,
    }),
    transformResponse: (response: { data: any }, meta, arg) => response.data,
    ...((partial ?? {}) as any),
    transformErrorResponse: (baseQueryReturnValue: any, meta, arg) =>
      baseQueryReturnValue.data,
  });

// Hàm `putBaseApi` nhận vào `builder` và định nghĩa một endpoint `mutation`
export const putBaseApi = <TBody>(
  url: string,
  builder: EndpointBuilder<BaseQueryFn, any, any>,
  partial?: Partial<ReturnType<typeof builder.query>>
) =>
  builder.mutation<any, TBody>({
    query: (body: TBody) => ({
      url,
      method: "PUT",
      body,
    }),
    transformResponse: (response: { data: any }, meta, arg) => response.data,
    ...((partial ?? {}) as any),
  });

// Hàm `patchBaseApi` nhận vào `builder` và định nghĩa một endpoint `mutation`
export const patchBaseApi = <TBody>(
  url: string,
  builder: EndpointBuilder<BaseQueryFn, any, any>,
  partial?: Partial<ReturnType<typeof builder.query>>
) =>
  builder.mutation<any, TBody>({
    query: (body: TBody) => ({
      url,
      method: "PATCH",
      body,
    }),
    transformResponse: (response: { data: any }, meta, arg) => response.data,
    ...((partial ?? {}) as any),
  });

interface DeleteParams {
  params: { id: string } | Record<string, any>; // `params` là một đối tượng tùy chọn
}

// Hàm `patchBaseApi` nhận vào `builder` và định nghĩa một endpoint `mutation`
export const deleteBaseApi = <DeleteParams>(
  url: string,
  builder: EndpointBuilder<BaseQueryFn, any, any>,
  partial?: Partial<ReturnType<typeof builder.query>>
) =>
  builder.mutation<any, DeleteParams>({
    query: (params: DeleteParams) => ({
      url,
      method: "DELETE",
      params,
    }),
    transformResponse: (response: { data: any }, meta, arg) => response.data,
    ...((partial ?? {}) as any),
  });

export const createEndpoints = (
  url: string,
  slide: string,
  builder: EndpointBuilder<BaseQueryFn, any, any>,
  partial?: Partial<ReturnType<typeof builder.query>>
) => ({
  [`get${slide}`]: getBaseApi(url, builder, partial),
  [`post${slide}`]: postBaseApi(url, builder),
  [`put${slide}`]: putBaseApi(url, builder, partial),
  [`patch${slide}`]: patchBaseApi(url, builder, partial),
  [`delete${slide}`]: deleteBaseApi(url, builder, partial),
});
