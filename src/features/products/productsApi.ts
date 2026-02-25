import { baseApi } from "@/services/baseApi";
import type {ProductTypeResponse} from '@/features/products/productsType'
import { Edit } from "lucide-react";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductTypeResponse[], void>({
        query: () => ({
            url: "/api/v1/product",
            method: "GET",
        }),
        providesTags: ['Products'],
    }),
    addProduct: builder.mutation<ProductTypeResponse, FormData>({
        query: (formData) => ({
            url: "/api/v1/product",
            method: "POST",
            body: formData,
        }),
        invalidatesTags: ['Products'],
    }),
    deleteProduct: builder.mutation<void, number>({
        query: (id) => ({
            url: `/api/v1/product/${id}`,
            method: "DELETE",
        }),
        invalidatesTags: ['Products'],
    }),
    getProductById: builder.query<ProductTypeResponse, string>({
        query: (id) => ({
            url: `/api/v1/product/${id}`,
            method: "GET",
        }),
        providesTags: (_result, _error, id) => [{ type: 'Products', id }],
    }),
    EditProduct: builder.mutation<ProductTypeResponse, { id: string; formData: FormData }>({
        query: ({ id, formData }) => ({
            url: `/api/v1/product/${id}`,
            method: "PATCH",
            body: formData,
        }),
                invalidatesTags: (_result, _error, { id }) => [
                    { type: 'Products', id },
                    { type: 'Products' }, // Invalidate the list so useGetProductsQuery refetches
                ],
    }),
  }),
});

export const { useGetProductsQuery, useAddProductMutation, useDeleteProductMutation, useGetProductByIdQuery, useEditProductMutation } = productsApi;