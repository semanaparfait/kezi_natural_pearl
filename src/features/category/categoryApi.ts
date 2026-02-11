import { baseApi } from "@/services/baseApi";
import type { categoryType } from "@/features/category/categoryTypes";

export const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<categoryType[], void>({
            query: () => ({
                url: "/api/v1/category",
                method: "GET",
            }),
            providesTags: ["Categories"],
        }),
        postCategory: builder.mutation<{ success: boolean; data: categoryType }, FormData>({
        query: (formData) => ({
            url: "/api/v1/category",
            method: "POST",
            body: formData,   
        }),
        invalidatesTags: ["Categories"],
        }),
        deleteCategory: builder.mutation<{ success: boolean; id: string }, string>({
            query: (categoryId) => ({
                url: `/api/v1/category/${categoryId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Categories"],
        }),
        editCategory: builder.mutation<{ success: boolean; data: categoryType }, Partial<categoryType> & { categoryId: string }>({
            query: ({ categoryId, ...body }) => ({
                url: `/api/v1/category/${categoryId}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Categories"],
        }),
    }),
});

export const { useGetCategoriesQuery, usePostCategoryMutation, useDeleteCategoryMutation, useEditCategoryMutation  } = categoryApi;