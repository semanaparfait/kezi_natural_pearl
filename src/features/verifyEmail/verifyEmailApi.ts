import { baseApi } from '@/services/baseApi'

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    verifyEmail: builder.query<
      { token: string; message: string }, // Match backend: token and message
      { token: string }
    >({
      query: ({ token }) => ({
        url: '/api/v1/auth/verify-email',
        method: 'GET',
        params: { token },
      }),
      // We use providesTags so that other parts of the app 
      // know the user status might have changed
      providesTags: ['User'],
    }),
  }),
  overrideExisting: false,
})

export const { useVerifyEmailQuery } = authApi
