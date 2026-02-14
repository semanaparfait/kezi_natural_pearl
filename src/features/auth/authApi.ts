import {baseApi} from '@/services/baseApi'
import type{ AuthResponse,LoginCredentials,RegisterData, } from '@/features/auth/authType'

export const authSlice = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, LoginCredentials>({
            query: (LoginCredentials) => ({
                url: '/api/v1/auth/login',
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
                url: '/api/v1/user/profile',
                method: 'GET',
            }),
            providesTags: ['User'],
        }),
        updateUser: builder.mutation< AuthResponse, Partial<RegisterData>>({
            query: (data) => ({
                url: '/api/v1/user/me',
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
            updateUserProfile: builder.mutation<AuthResponse, FormData>({
            query: (formData) => ({
                url: '/api/v1/user/me',
                method: 'PATCH',
                body: formData,
            }),
            invalidatesTags: ['User'],
            }),
            refreshToken: builder.mutation<AuthResponse, string>({
            query: (refreshToken) => ({
                url: '/api/v1/auth/refresh',
                method: 'POST',
                body: {
                refresh_token: refreshToken,
                },
            }),
            }),
        deleteUser: builder.mutation<void, { password: string }>({
            query: ({ password }) => ({
                url: '/api/v1/user/me',
                method: 'DELETE',
                body: { password },
            }),
            invalidatesTags: ['User'],
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
        }),
    }),
})

export const { useLoginMutation, useRegisterMutation, useGetCurrentUserQuery, useUpdateUserMutation, useDeleteUserMutation, useLogoutMutation } = authSlice;
