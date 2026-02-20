import {baseApi} from '@/services/baseApi'
import type{ CartItem, CartItemResponse, CheckoutData } from '@/features/cart/cartType';

export const cartApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        addToCart: build.mutation<CartItem, CartItem>({
            query: (item) => ({
                url: '/api/v1/cart/item',
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
            query: () =>({
                url:'/api/v1/cart',
                method: 'GET',
            }) ,
            
            providesTags: ['Cart'],
        }),
        updateCartItem: build.mutation<CartItem, { productId: string; quantity: number }>({
            query: ({ productId, quantity }) => ({
                url: `/api/v1/cart/item/${productId}`,
                method: 'PATCH',
                body: { quantity },
            }),
            invalidatesTags: ['Cart'],
        }),
        checkout: build.mutation<{ success: boolean }, CheckoutData>({
            query: (checkoutData) => ({
                url: '/api/v1/cart/check-out',
                method: 'POST',
                body: checkoutData,
            }),
            invalidatesTags: ['Cart'],
        }),
    }),
});

export const {
    useAddToCartMutation,
    useRemoveFromCartMutation,
    useGetCartItemsQuery,
    useUpdateCartItemMutation,
    useCheckoutMutation,
} = cartApi;