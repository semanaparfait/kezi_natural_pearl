import {baseApi} from '@/services/baseApi'
import type {Order} from '@/features/orders/orderType'

export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation({
        query: (orderData) => ({
            url: '/orders',
            method: 'POST',
            body: orderData,
        }),
    }),
    getMyOrders: build.query<Order[], void>({
        query: () => 'api/v1/order',
    }),
    getAllOrders: build.query<Order[], void>({
        query: () => '/api/v1/order/admin',
    }),

    getOrderById: build.query({
        query: (orderId) => `/api/v1/orders/${orderId}`,
    }),
  }),
});

export const { useCreateOrderMutation, useGetMyOrdersQuery, useGetOrderByIdQuery, useGetAllOrdersQuery } = orderApi;