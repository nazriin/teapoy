// features/services/servicesAPI.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const servicesApi = createApi({
    reducerPath: 'servicesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }), // Adjust your base URL if needed
    tagTypes: ['Service'],
    endpoints: (builder) => ({
        getAllServices: builder.query({
            query: () => '/service/all',
            providesTags: ['Service'],
        }),
        getServiceById: builder.query({
            query: (id) => `/service/${id}`,
            providesTags: (result, error, id) => [{ type: 'Service', id }],
        }),
        addService: builder.mutation({
            query: (newService) => ({
                url: '/service/add',
                method: 'POST',
                body: newService,
            }),
            invalidatesTags: ['Service'],
        }),
        updateService: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `/service/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Service', id }],
        }),
        deleteService: builder.mutation({
            query: (id) => ({
                url: `/service/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Service'],
        }),
    }),
});

export const {
    useGetAllServicesQuery,
    useGetServiceByIdQuery,
    useAddServiceMutation,
    useUpdateServiceMutation,
    useDeleteServiceMutation,
} = servicesApi;

// Remember to add this reducer to your store
// Example:
// import { configureStore } from '@reduxjs/toolkit';
// import { servicesApi } from './servicesAPI';
//
// export const store = configureStore({
//   reducer: {
//     [servicesApi.reducerPath]: servicesApi.reducer,
//     // ...other reducers
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(servicesApi.middleware),
// });