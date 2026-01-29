import {baseApi} from '@/services/baseApi'
import type{ AuthResponse,LoginCredentials,RegisterData} from '@/features/auth/authType'

export const authSlice = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, LoginCredentials>({
            query: (LoginCredentials) => ({
                url: '/auth/login',
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
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
        }),
    }),
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authSlice;
