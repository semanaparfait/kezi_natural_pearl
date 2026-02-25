import {baseApi} from '@/services/baseApi'
import type {CurrencyResponse} from '@/features/Currency/CurrencyTypes'
const currencyApi = baseApi.injectEndpoints({
    endpoints: (builder) => {
        return {
            getCurrency: builder.query<CurrencyResponse[], void>({
                query: () => ({
                    url: '/api/v1/currency',
                    method: 'GET',
                }),
            }),
            updateCurrency: builder.mutation<CurrencyResponse, { currencyId: string }>({
                query: ({ currencyId }) => ({
                    url: '/api/v1/user-preferences',
                    method: 'PATCH',
                    body: { currencyId },
                }),
            }),
        };
    },
});

export const { useGetCurrencyQuery, useUpdateCurrencyMutation } = currencyApi;