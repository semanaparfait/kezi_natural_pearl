import { baseApi } from '@/services/baseApi'
import type { User } from '@/features/auth/authType'

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    verifyEmail: builder.mutation<
      { token: string; user: User },
      { token: string }
    >({
      query: ({ token }) => ({
        url: '/api/v1/auth/verify-email',
        method: 'POST',
        body: { token },
      }),
      invalidatesTags: ['User'],
    }),
  }),
  overrideExisting: false,
})

export const { useVerifyEmailMutation } = authApi
