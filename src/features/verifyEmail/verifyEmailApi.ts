import { baseApi } from '@/services/baseApi'
import type { User } from '@/features/auth/authType'

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    verifyEmail: builder.query<
      { token: string; user: User },
      { token: string }
    >({
      query: ({ token }) => ({
        url: '/api/v1/auth/verify-email',
        method: 'GET',
        params: { token },
      }),
      providesTags: ['User'],
    }),
  }),
  overrideExisting: false,
})

export const { useVerifyEmailQuery } = authApi
