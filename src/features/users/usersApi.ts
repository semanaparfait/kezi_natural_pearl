import { baseApi } from "@/services/baseApi";
import type { Users } from "@/features/users/usersTypes";

export const usersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<Users[], void>({
            query: () => ({
                url: '/api/v1/user/all',
                method: 'GET',
            }),
            providesTags: ['Users'],
        }),
        updateRole: builder.mutation<void, { email: string; role: string }>({
            query: ({ email, role }) => ({
                url: `/api/v1/user/update-role`,
                method: 'PATCH',
                body: {email, role },
            }),
            invalidatesTags: ['Users'],
        }),
        deleteUser: builder.mutation<void, { userId: string }>({
            query: ({ userId }) => ({
                url: `/api/v1/user/remove/${userId}`,
                method: 'DELETE',
                body: { userId },
            }),
            invalidatesTags: ['Users'],
        }),
    }),
});
export const { useGetUsersQuery, useUpdateRoleMutation, useDeleteUserMutation } = usersApi;