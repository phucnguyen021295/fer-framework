// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import {
  createApi,
  fetchBaseQuery,
  EndpointBuilder,
  BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
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
  tagTypes: JSON.parse(process.env.TAG_TYPES || '[]')
});

interface QueryParams<T> {
  params?: T; // `params` là một đối tượng tùy chọn
}

// Hàm `getBaseApi` nhận vào `builder` và định nghĩa một endpoint `query`
export const getBaseApi = <T>(
  url: string,
  builder: EndpointBuilder<BaseQueryFn, any, any>,
  partial?: Partial<ReturnType<typeof builder.query>>
) =>
  builder.query<any, QueryParams<T>>({
    query: (params: T) => ({
      url,
      method: "GET",
      params,
    }),
    transformResponse: (response: { data: any }, meta, arg) => response.data,
    ...((partial ?? {}) as any),
  });

interface MutationParams<T> {
  body: T;
  params?: Record<string, any>; // `params` là một đối tượng tùy chọn
}

// Hàm `postBaseApi` nhận vào `builder` và định nghĩa một endpoint `mutation`
export const postBaseApi = <T>(
  url: string,
  builder: EndpointBuilder<BaseQueryFn, any, any>,
  partial?: Partial<ReturnType<typeof builder.mutation>>
) =>
  builder.mutation<any, MutationParams<T>>({
    query: ({ body, params }: MutationParams<T>) => ({
      url,
      method: "POST",
      body,
      params,
    }),
    transformResponse: (response: { data: any }, meta, arg) => response.data,
    ...((partial ?? {}) as any),
  });

// Hàm `putBaseApi` nhận vào `builder` và định nghĩa một endpoint `mutation`
export const putBaseApi = <T>(
  url: string,
  builder: EndpointBuilder<BaseQueryFn, any, any>,
  partial?: Partial<ReturnType<typeof builder.query>>
) =>
  builder.mutation<any, MutationParams<T>>({
    query: ({ body, params }: MutationParams<T>) => ({
      url,
      method: "POST",
      body,
      params,
    }),
    transformResponse: (response: { data: any }, meta, arg) => response.data,
    ...((partial ?? {}) as any),
  });

// Hàm `patchBaseApi` nhận vào `builder` và định nghĩa một endpoint `mutation`
export const patchBaseApi = <T>(
  url: string,
  builder: EndpointBuilder<BaseQueryFn, any, any>,
  partial?: Partial<ReturnType<typeof builder.query>>
) =>
  builder.mutation<any, MutationParams<T>>({
    query: ({ body, params }: MutationParams<T>) => ({
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
  get: getBaseApi(url, builder, partial),
  post: postBaseApi(url, builder, partial),
  put: putBaseApi(url, builder, partial),
  patch: patchBaseApi(url, builder, partial),
  delete: deleteBaseApi(url, builder, partial),
});
