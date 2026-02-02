import { baseApi } from "@/services/baseApi";
import type {productsTypeRequest,ProductTypeResponse} from '@/features/products/productsType'

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductTypeResponse[], void>({
        query: () => ({
            url: "/api/v1/product",
            method: "GET",
        }),
        providesTags: ['Products'],
    }),
    addProduct: builder.mutation<ProductTypeResponse, Partial<productsTypeRequest>>({
        query: (body) => ({
            url: "/api/v1/product",
            method: "POST",
            body,
        }),
        invalidatesTags: ['Products'],
    }),
  }),
});

export const { useGetProductsQuery, useAddProductMutation } = productsApi;