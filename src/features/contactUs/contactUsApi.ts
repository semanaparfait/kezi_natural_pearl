import {baseApi} from '@/services/baseApi'
import type{ ContactUsForm ,ContactResponse} from '@/features/contactUs/contactUsType'

export const contactUsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        submitContactForm: builder.mutation<void, ContactUsForm>({
            query: (form) => ({
                url: '/api/v1/contact',
                method: 'POST',
                body: form,
            }),
        }),
        getContactedMessages: builder.query<ContactResponse[], void>({
            query: () => ({
                url: '/api/v1/contact',
                method: 'GET',
            }),
            providesTags: ['ContactMessages'],
        }),
        replyMessage: builder.mutation<void, { id: string; response: string }>({
            query: ({ id, response }) => ({
                url: `/api/v1/contact/respond/${id}`,
                method: 'PATCH',
                body: { response },
            }),
            invalidatesTags: ['ContactMessages'],
        }),
    }),
})
export const { useSubmitContactFormMutation, useGetContactedMessagesQuery, useReplyMessageMutation } = contactUsApi;