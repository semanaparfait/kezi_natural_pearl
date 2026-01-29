import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://kezi-pearl-production.up.railway.app',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: () => ({}),
  tagTypes: [ 'Auth', 'User', 'Products' ,'Categories' ,'Cart' ,'Orders', 'Reviews', 'Wishlist' ,'Addresses', 'Payments' ],
});