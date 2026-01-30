import {baseApi} from '@/services/baseApi'
import type{ AuthResponse,LoginCredentials,RegisterData, User} from '@/features/auth/authType'

export const authSlice = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, LoginCredentials>({
            query: (LoginCredentials) => ({
                url: '/api/v1/Auth/login',
                method: 'POST',
                body: LoginCredentials,
            }),
        }),
        register: builder.mutation< AuthResponse, RegisterData>({    
            query: (RegisterData) => ({
                url: '/api/v1/Auth/register',
                method: 'POST',
                body: RegisterData,
            }),
        }),
        getCurrentUser: builder.query<AuthResponse, void>({
            query: () => ({
                url: '/api/v1/user/me',
                method: 'GET',
            }),
            providesTags: ['User'],
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
        }),
    }),
})

export const { useLoginMutation, useRegisterMutation, useGetCurrentUserQuery, useLogoutMutation } = authSlice;
