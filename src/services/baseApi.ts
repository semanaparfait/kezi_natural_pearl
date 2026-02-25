import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Enhanced baseQuery with refresh token logic
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://kezi-pearl-production.up.railway.app',
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

const baseQueryWithRefresh: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // Try refresh token
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      const refreshResult = await baseQuery({
        url: '/api/v1/auth/refresh',
        method: 'POST',
        body: { refreshToken },
      }, api, extraOptions);
      if (
        refreshResult.data &&
        typeof refreshResult.data === 'object' &&
        'access_token' in refreshResult.data
      ) {
        const accessToken = (refreshResult.data as { access_token: string }).access_token;
        localStorage.setItem('token', accessToken);
        // Retry original request with new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Refresh failed, logout
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        // Optionally: dispatch logout action
      }
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithRefresh,
  endpoints: () => ({}),
  tagTypes: [ 'Auth', 'User', 'Users','ContactMessages', 'Products' ,'Categories' ,'Cart' ,'Orders', 'Reviews', 'Wishlist' ,'Addresses', 'Payments' ],
});