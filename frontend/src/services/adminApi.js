// src/services/adminApi.js (No changes needed for core functionality)
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/admin',
        credentials: 'include', // Important for sending/receiving cookies
        prepareHeaders: (headers, { getState }) => {
            return headers;
        },
    }),
    tagTypes: ['Admin'],
    endpoints: (builder) => ({
        loginAdmin: builder.mutation({
            query: (data) => ({
                url: '/login',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Admin'],
        }),
        logoutAdmin: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
            invalidatesTags: ['Admin'],
        }),
        // New endpoint for fetching admin profile
        getAdminProfile: builder.query({
            query: () => ({
                url: '/profile',
                method: 'GET',
            }),
            providesTags: ['Admin'],
        }),
    }),
});

export const {
    useLoginAdminMutation,
    useLogoutAdminMutation,
    useGetAdminProfileQuery,
} = adminApi;