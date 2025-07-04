// src/services/adoptionApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const adoptionApi = createApi({
    reducerPath: 'adoptionApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/adoption' }), // Adjust base URL as per your backend route
    endpoints: (builder) => ({
        sendAdoptionInquiry: builder.mutation({
            query: (formData) => ({
                url: '/',
                method: 'POST',
                body: formData,
            }),
        }),
    }),
});

export const { useSendAdoptionInquiryMutation } = adoptionApi;