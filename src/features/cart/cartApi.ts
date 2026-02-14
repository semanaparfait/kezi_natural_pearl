import {baseApi} from '@/services/baseApi'
import type{ CartItem } from '@/features/cart/cartType';

export const cartApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        addToCart: build.mutation<CartItem, CartItem>({
            query: (item) => ({
                url: '/api/v1/cart/add-to-cart',
                method: 'POST',
                body: item,
            }),
        }),
        removeFromCart: build.mutation<{ success: boolean }, string>({
            query: (id) => ({
                url: `/cart/${id}`,
                method: 'DELETE',
            }),
        }),
        getCartItems: build.query<CartItem[], void>({
            query: () => '/cart',
        }),
    }),
});

export const {
    useAddToCartMutation,
    useRemoveFromCartMutation,
    useGetCartItemsQuery,
} = cartApi;