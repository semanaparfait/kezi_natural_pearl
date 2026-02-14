import {baseApi} from '@/services/baseApi'
import type{ ContactUsForm } from '@/features/contactUs/contactUsType'

export const contactUsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        submitContactForm: builder.mutation<void, ContactUsForm>({
            query: (form) => ({
                url: '/api/v1/public-contact',
                method: 'POST',
                body: form,
            }),
        }),
        getContactedMessages: builder.query<ContactUsForm[], void>({
            query: () => ({
                url: '/api/v1/contactUs/messages',
                method: 'GET',
            }),
            providesTags: ['ContactMessages'],
        }),
    }),
})
export const { useSubmitContactFormMutation, useGetContactedMessagesQuery } = contactUsApi;