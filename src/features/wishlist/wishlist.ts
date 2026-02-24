import {baseApi} from '@/services/baseApi'

export const wishlistApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getWishlist: build.query({
        query: () => ({
            url: '/api/v1/wishlist',
            method: 'GET',
        }),
        providesTags: ['Wishlist'],
    }),
    addToWishlist: build.mutation({
        query: (productId: string) => ({
            url: `/api/v1/wishlist/product/${productId}`,
            method: 'POST',
            body: { productId },
        }),
        invalidatesTags: ['Wishlist'],
    }),
    removeFromWishlist: build.mutation({
        query: (id: string) => ({
            url: `/api/v1/wishlist/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Wishlist'],
    }),
  }),
})

export const { useGetWishlistQuery, useAddToWishlistMutation, useRemoveFromWishlistMutation } = wishlistApi