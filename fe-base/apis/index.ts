// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import {
  createApi,
  fetchBaseQuery,
  EndpointBuilder,
  BaseQueryFn,
  FetchBaseQueryError,
  FetchArgs,
} from '@reduxjs/toolkit/query/react';
import {Mutex} from 'async-mutex';
import {
  getToken,
  getRefreshToken,
  getOrganizationCode,
} from '@/fe-base/utils/getToken';
import {AUTH_ACTION} from '../actions';

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.URL_SERVER,
  prepareHeaders: (headers, {getState, endpoint}) => {
    headers.set('Content-Type', 'application/json');
    const state = getState();
    const token = getToken(state);
    const organizationCode = getOrganizationCode(state);
    if (!!token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    if (!!organizationCode) {
      headers.set('organizationCode', organizationCode);
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
  if (
    result.error &&
    (result.error.status === 401 || result.error?.originalStatus === 401)
  ) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshToken = getRefreshToken(api.getState());
        const refreshResult = await baseQuery(
          {
            url: process.env?.AUTH_URL_REFRESH_TOKEN || '',
            method: 'POST',
            body: {refreshToken},
          },
          api,
          extraOptions,
        );
        if (refreshResult.data) {
          api.dispatch({
            type: AUTH_ACTION.TOKEN_RECEIVED,
            payload: refreshResult.data,
          });
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch({type: AUTH_ACTION.EXPIRED});
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
  tagTypes: JSON.parse(process.env.TAG_TYPES || '[]'),
});

// Hàm `getBaseApi` nhận vào `builder` và định nghĩa một endpoint `query`
export const getBaseApi = <TParams extends Record<string, any>>(
  url: string,
  builder: EndpointBuilder<BaseQueryFn, any, any>,
  partial?: Partial<ReturnType<typeof builder.query>>,
) =>
  builder.query<any, TParams>({
    query: (params: TParams) => ({
      url,
      method: 'GET',
      ...(params ? {params} : {}),
    }),
    transformResponse: (response: {data: any}, meta, arg) => response.data,
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
  partial?: Partial<ReturnType<typeof builder.mutation>>,
) =>
  builder.mutation<TBody, MutationParams<TBody, TParams>>({
    query: ({body, params}: MutationParams<TBody, TParams>) => ({
      url,
      method: 'POST',
      body,
      params,
    }),
    transformResponse: (response: {data: any}, meta, arg) => response.data,
    ...((partial ?? {}) as any),
  });

// Hàm `putBaseApi` nhận vào `builder` và định nghĩa một endpoint `mutation`
export const putBaseApi = <TBody, TParams = Record<string, any>>(
  url: string,
  builder: EndpointBuilder<BaseQueryFn, any, any>,
  partial?: Partial<ReturnType<typeof builder.query>>,
) =>
  builder.mutation<any, MutationParams<TBody, TParams>>({
    query: ({body, params}: MutationParams<TBody, TParams>) => ({
      url,
      method: 'PUT',
      body,
      params,
    }),
    transformResponse: (response: {data: any}, meta, arg) => response.data,
    ...((partial ?? {}) as any),
  });

// Hàm `patchBaseApi` nhận vào `builder` và định nghĩa một endpoint `mutation`
export const patchBaseApi = <TBody, TParams = Record<string, any>>(
  url: string,
  builder: EndpointBuilder<BaseQueryFn, any, any>,
  partial?: Partial<ReturnType<typeof builder.query>>,
) =>
  builder.mutation<any, MutationParams<TBody, TParams>>({
    query: ({body, params}: MutationParams<TBody, TParams>) => ({
      url,
      method: 'PATCH',
      body,
      params,
    }),
    transformResponse: (response: {data: any}, meta, arg) => response.data,
    ...((partial ?? {}) as any),
  });

interface DeleteParams {
  params: {id: string} | Record<string, any>; // `params` là một đối tượng tùy chọn
}

// Hàm `patchBaseApi` nhận vào `builder` và định nghĩa một endpoint `mutation`
export const deleteBaseApi = (
  url: string,
  builder: EndpointBuilder<BaseQueryFn, any, any>,
  partial?: Partial<ReturnType<typeof builder.query>>,
) =>
  builder.mutation<any, DeleteParams>({
    query: ({params}: DeleteParams) => ({
      url,
      method: 'DELETE',
      params,
    }),
    transformResponse: (response: {data: any}, meta, arg) => response.data,
    ...((partial ?? {}) as any),
  });

export const createEndpoints = (
  url: string,
  slide: string,
  builder: EndpointBuilder<BaseQueryFn, any, any>,
  partial?: Partial<ReturnType<typeof builder.query>>,
) => ({
  [`get${slide}`]: getBaseApi(url, builder, partial),
  [`post${slide}`]: postBaseApi(url, builder, partial),
  [`put${slide}`]: putBaseApi(url, builder, partial),
  [`patch${slide}`]: patchBaseApi(url, builder, partial),
  [`delete${slide}`]: deleteBaseApi(url, builder, partial),
});
