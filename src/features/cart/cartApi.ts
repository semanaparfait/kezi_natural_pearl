import {baseApi} from '@/services/baseApi'
import type{ CartItem, CartItemResponse } from '@/features/cart/cartType';

export const cartApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        addToCart: build.mutation<CartItem, CartItem>({
            query: (item) => ({
                url: '/api/v1/cart/add-to-cart',
                method: 'POST',
                body: item,
            }),
            invalidatesTags: ['Cart'],
        }),
            removeFromCart: build.mutation<{ success: boolean }, string>({
            query: (productId) => ({
                url: '/api/v1/cart',
                method: 'DELETE',
                body: {
                items: [productId]  
                }
            }),
            invalidatesTags: ['Cart'],
            }),

        getCartItems: build.query<CartItemResponse, void>({
            query: () => '/api/v1/cart',
            providesTags: ['Cart'],
        }),
    }),
});

export const {
    useAddToCartMutation,
    useRemoveFromCartMutation,
    useGetCartItemsQuery,
} = cartApi;