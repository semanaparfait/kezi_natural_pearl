import { baseApi } from '@/services/baseApi'

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    verifyEmail: builder.query<
      { token: string; message: string }, 
      {  token: string }
    >({
      query: ({ token }) => ({
        url: `/api/v1/auth/verify/${token}`,
        method: 'GET',
        params: { token },
      }),
      providesTags: ['User'],
    }),
  }),
  overrideExisting: false,
})

export const { useVerifyEmailQuery } = authApi
