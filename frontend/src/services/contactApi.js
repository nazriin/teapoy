// redux/services/contactApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a base query with your API base URL
const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }); // Assuming your API is served from /api

export const contactApi = createApi({
    reducerPath: 'contactApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        sendAppointmentRequest: builder.mutation({
            query: (formData) => ({
                url: 'contact/appointment',
                method: 'POST',
                body: formData,
            }),
        }),
    }),
});

// Export the auto-generated hook for the mutation
export const { useSendAppointmentRequestMutation } = contactApi;