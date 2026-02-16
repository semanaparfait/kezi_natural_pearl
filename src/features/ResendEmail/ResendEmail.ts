import {baseApi} from '@/services/baseApi'
import type {ResendEmailRequest} from '@/features/ResendEmail/ResendEmailType'
export const resendEmailApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        resendEmail: build.mutation<{ message: string }, ResendEmailRequest>({
            query: (data) => ({
                url: '/api/v1/auth/resend-verification',
                method: 'POST',
                body: data,
            }),
        }),
    }),
    overrideExisting: false,
})

export const { useResendEmailMutation } = resendEmailApi;