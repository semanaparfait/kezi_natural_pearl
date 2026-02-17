import {baseApi} from '@/services/baseApi'
import type {AddresRequest} from '@/features/Address/AddressTypes'
export const addressApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        addAddress: build.mutation<{ success: boolean; message: string }, AddresRequest>({
            query: (addressRequest: AddresRequest) => ({
                url: '/api/v1/address',
                method: 'POST',
                body: addressRequest,
            }),
            invalidatesTags: ['Addresses'],
        }),
        getAddresses: build.query<any, void>({
            query: () => ({
                url: '/api/v1/address',
            }),
            providesTags: ['Addresses'],
        }),
    }),
});

export const  {useAddAddressMutation, useGetAddressesQuery} = addressApi;
