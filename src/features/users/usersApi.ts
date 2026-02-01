import { baseApi } from "@/services/baseApi";
import type { Users } from "@/features/users/usersTypes";

export const usersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<Users[], void>({
            query: () => ({
                url: '/api/v1/user',
                method: 'GET',
            }),
            providesTags: ['Users'],
        }),
        updateRole: builder.mutation<void, { email: string; role: string }>({
            query: ({ email, role }) => ({
                url: `/api/v1/user`,
                method: 'PATCH',
                body: {email, role },
            }),
            invalidatesTags: ['Users'],
        }),

    }),
});
export const { useGetUsersQuery, useUpdateRoleMutation } = usersApi;