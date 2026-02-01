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

    }),
});
export const { useGetUsersQuery } = usersApi;