import {baseApi} from '@/services/baseApi'
import type {Order, OrderResponse} from '@/features/orders/orderType'

export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation({
        query: (orderData) => ({
            url: '/orders',
            method: 'POST',
            body: orderData,
        }),
    }),
    getMyOrders: build.query<OrderResponse, void>({
        query: () => 'api/v1/order',
    }),
    getAllOrders: build.query<Order[], void>({
        query: () => '/api/v1/order/admin',
    }),
    getOrderById: build.query({
            query: () => ({
            url: `/api/v1/order/id`,
        }),
    }),
    cancelOrder: build.mutation({
        query: (id) => ({
          url: `/api/v1/order/admin/cancel/${id}`,
          method: 'PATCH',
        }),
    }),
    confirmOrder: build.mutation({
      query: (id) => ({
        url: `/api/v1/order/admin/process/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Orders'],
    }),
    shipOrder: build.mutation({
      query: (id) => ({
        url: `/api/v1/order/admin/ship/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Orders'],
    }),
    deliverOrder: build.mutation({
      query: (id) => ({
        url: `/api/v1/order/admin/deliver/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
});

export const { useCreateOrderMutation, useGetMyOrdersQuery, useGetOrderByIdQuery, useGetAllOrdersQuery, useCancelOrderMutation, useConfirmOrderMutation, useShipOrderMutation, useDeliverOrderMutation } = orderApi;