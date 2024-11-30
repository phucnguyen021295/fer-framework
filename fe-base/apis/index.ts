// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import {
  createApi,
  fetchBaseQuery,
  EndpointBuilder,
  BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import { getToken } from "@/fe-base/utils/getToken";

// initialize an empty api service that we'll inject endpoints into later as needed
export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.URL_SERVER,
    prepareHeaders: (headers, { getState, endpoint }) => {
      headers.set("Content-Type", "application/json");
      const state = getState();
      const token = getToken(state);
      if (!!token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("organizationCode", `ROX`);
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: JSON.parse(process.env.TAG_TYPES || "[]"),
});

interface QueryParams<TParams = Record<string, any>> {
  params?: TParams; // `params` là một đối tượng tùy chọn
}

// Hàm `getBaseApi` nhận vào `builder` và định nghĩa một endpoint `query`
export const getBaseApi = <TParams extends Record<string, any>>(
  url: string,
  builder: EndpointBuilder<BaseQueryFn, any, any>,
  partial?: Partial<ReturnType<typeof builder.query>>
) =>
  builder.query<any, QueryParams<TParams>>({
    query: (params: QueryParams<TParams>) => ({
      url,
      method: "GET",
      ...(params ? { params } : {}),
    }),
    transformResponse: (response: { data: any }, meta, arg) => response.data,
    ...((partial ?? {}) as any),
  });

  interface MutationParams<TBody, TParams = Record<string, any>> {
    body: TBody;
    params?: TParams;
  }

// Hàm `postBaseApi` nhận vào `builder` và định nghĩa một endpoint `mutation`
export const postBaseApi = <TBody, TParams = Record<string, any>>(
  url: string,
  builder: EndpointBuilder<BaseQueryFn, any, any>,
  partial?: Partial<ReturnType<typeof builder.mutation>>
) =>
  builder.mutation<TBody, MutationParams<TBody, TParams>>({
    query: ({ body, params }: MutationParams<TBody, TParams>) => ({
      url,
      method: "POST",
      body,
      params,
    }),
    transformResponse: (response: { data: any }, meta, arg) => response.data,
    ...((partial ?? {}) as any),
  });

// Hàm `putBaseApi` nhận vào `builder` và định nghĩa một endpoint `mutation`
export const putBaseApi = <TBody, TParams = Record<string, any>>(
  url: string,
  builder: EndpointBuilder<BaseQueryFn, any, any>,
  partial?: Partial<ReturnType<typeof builder.query>>
) =>
  builder.mutation<any, MutationParams<TBody, TParams>>({
    query: ({ body, params }: MutationParams<TBody, TParams>) => ({
      url,
      method: "PUT",
      body,
      params,
    }),
    transformResponse: (response: { data: any }, meta, arg) => response.data,
    ...((partial ?? {}) as any),
  });

// Hàm `patchBaseApi` nhận vào `builder` và định nghĩa một endpoint `mutation`
export const patchBaseApi = <TBody, TParams = Record<string, any>>(
  url: string,
  builder: EndpointBuilder<BaseQueryFn, any, any>,
  partial?: Partial<ReturnType<typeof builder.query>>
) =>
  builder.mutation<any, MutationParams<TBody, TParams>>({
    query: ({ body, params }: MutationParams<TBody, TParams>) => ({
      url,
      method: "PATCH",
      body,
      params,
    }),
    transformResponse: (response: { data: any }, meta, arg) => response.data,
    ...((partial ?? {}) as any),
  });

interface DeleteParams {
  params: { id: string } | Record<string, any>; // `params` là một đối tượng tùy chọn
}

// Hàm `patchBaseApi` nhận vào `builder` và định nghĩa một endpoint `mutation`
export const deleteBaseApi = (
  url: string,
  builder: EndpointBuilder<BaseQueryFn, any, any>,
  partial?: Partial<ReturnType<typeof builder.query>>
) =>
  builder.mutation<any, DeleteParams>({
    query: ({ params }: DeleteParams) => ({
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
  [`post${slide}`]: postBaseApi(url, builder, partial),
  [`put${slide}`]: putBaseApi(url, builder, partial),
  [`patch${slide}`]: patchBaseApi(url, builder, partial),
  [`delete${slide}`]: deleteBaseApi(url, builder, partial),
});
