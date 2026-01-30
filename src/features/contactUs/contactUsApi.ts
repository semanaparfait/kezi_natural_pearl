import {baseApi} from '@/services/baseApi'
import type{ ContactUsForm } from '@/features/contactUs/contactUsType'

export const contactUsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        submitContactForm: builder.mutation<void, ContactUsForm>({
            query: (formData) => ({
                url: '/api/v1/contactUs',
                method: 'POST',
                body: formData,
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