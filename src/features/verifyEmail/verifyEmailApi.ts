import { baseApi } from '@/services/baseApi'

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    verifyEmail: builder.query<
      { token: string; message: string }, 
      { id: string; token: string }
    >({
      query: ({ id, token }) => ({
        url: '/api/v1/auth/verify-email/',
        method: 'GET',
        params: { id, token },
      }),
      providesTags: ['User'],
    }),
  }),
  overrideExisting: false,
})

export const { useVerifyEmailQuery } = authApi
