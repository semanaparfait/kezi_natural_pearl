import {baseApi} from '@/services/baseApi'

export const wishlistApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getWishlist: build.query({
        query: () => ({
            url: '/api/v1/wishlist',
            method: 'GET',
        }),
    }),
    addToWishlist: build.mutation({
        query: (productId: string) => ({
            url: `/api/v1/wishlist/productId`,
            method: 'POST',
            body: { productId },
        }),
    }),
    removeFromWishlist: build.mutation({
        query: (id: string) => ({
            url: `/api/v1/wishlist/${id}`,
            method: 'DELETE',
        }),
    }),
  }),
})

export const { useGetWishlistQuery, useAddToWishlistMutation, useRemoveFromWishlistMutation } = wishlistApi