import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
const mutex = new Mutex();

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

const baseQueryWithRefresh: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (refreshToken) {
          const refreshResult = await baseQuery(
            {
              url: '/api/v1/auth/refresh',
              method: 'POST',
              body: { refreshToken }, 
            },
            api,
            extraOptions
          );
          const data = refreshResult.data as { access_token: string; refresh_token?: string };

          if (data && data.access_token) {
            localStorage.setItem('token', data.access_token);
            if (data.refresh_token) {
              localStorage.setItem('refreshToken', data.refresh_token);
            }
            result = await baseQuery(args, api, extraOptions);
          } else {
            handleLogout();
          }
        } else {
          handleLogout();
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

// Helper to clean up on failure
const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  // Avoid window.location.href if you want to avoid a full page reload, 
  // but it's the safest way to clear the app state.
  if (window.location.pathname !== '/login') {
    window.location.href = '/login';
  }
};



export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithRefresh,
  endpoints: () => ({}),
  tagTypes: [
    'Auth', 'User', 'Users', 'ContactMessages', 'Products', 
    'Categories', 'Cart', 'Orders', 'Reviews', 'Wishlist', 
    'Addresses', 'Payments'
  ],
});