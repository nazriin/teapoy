// src/features/contact/contactUsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactUsApi = createApi({
    reducerPath: 'contactUsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }), // Adjust your base URL if needed
    endpoints: (builder) => ({
        submitAppointmentForm: builder.mutation({ // Ad dəyişdirildi
            query: (formData) => ({
                url: '/contact/appointment',
                method: 'POST',
                body: formData,
            }),
        }),
    }),
});

export const { useSubmitAppointmentFormMutation } = contactUsApi; // Export adı dəyişdirildi

// Remember to add this reducer to your store
// Example:
// import { configureStore } from '@reduxjs/toolkit';
// import { servicesApi } from '../features/services/servicesAPI';
// import { contactUsApi } from './contactUsApi';
//
// export const store = configureStore({
//   reducer: {
//     [servicesApi.reducerPath]: servicesApi.reducer,
//     [contactUsApi.reducerPath]: contactUsApi.reducer,
//     // ...other reducers
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(servicesApi.middleware, contactUsApi.middleware),
// });