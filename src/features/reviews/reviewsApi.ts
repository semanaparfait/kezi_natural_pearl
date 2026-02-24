import { baseApi } from '@/services/baseApi';

export const reviewsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getReviews: build.query({
      query: (productId: string) => ({
        url: `/api/v1/reviews/product/${productId}`,
        method: 'GET',
      }),
      providesTags: ['Reviews'],
    }),
    addReview: build.mutation({
      query: ({ productId, rating, comment }: { productId: string; rating: number; comment: string }) => ({
        url: `/api/v1/reviews/${productId}`,
        method: 'POST',
        body: { rating, comment },
      }),
      invalidatesTags: ['Reviews'],
    }),
  }),
});

export const { useGetReviewsQuery, useAddReviewMutation } = reviewsApi;
