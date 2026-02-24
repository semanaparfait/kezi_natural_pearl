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
        query: (orderId) => ({
            url: `/api/v1/order/cancel/id`,
            method: 'PATCH',
  }),
    }),
    confirmOrder: build.mutation({
      query: (orderId) => ({
        url: `/api/v1/order/confirm/id`,
        method: 'PATCH',
        }),
    }),
    shipOrder: build.mutation({
      query: (orderId) => ({
        url: `/api/v1/order/ship/id`,
        method: 'PATCH',
        }),
    }),
    deliverOrder: build.mutation({
      query: (orderId) => ({
        url: `/api/v1/order/deliver/id`,
        method: 'PATCH',
        }),
    }),
  }),
});

export const { useCreateOrderMutation, useGetMyOrdersQuery, useGetOrderByIdQuery, useGetAllOrdersQuery, useCancelOrderMutation, useConfirmOrderMutation, useShipOrderMutation, useDeliverOrderMutation } = orderApi;