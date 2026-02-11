import { baseApi } from "@/services/baseApi";
import type {ProductTypeResponse} from '@/features/products/productsType'

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
  }),
});

export const { useGetProductsQuery, useAddProductMutation } = productsApi;