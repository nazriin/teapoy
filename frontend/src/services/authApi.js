import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api',
    }),
    endpoints: (builder) => ({
        createUser: builder.mutation({
            query: (userData) => ({
                url: '/user',
                method: 'POST',
                body: userData,
            }),
        }),
        createSeller: builder.mutation({
            query: (userData) => ({
                url: '/seller',
                method: 'POST',
                body: userData,
            }),
        }),
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: '/user/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        loginSeller: builder.mutation({
            query: (credentials) => ({
                url: '/seller/login',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

export const { useCreateUserMutation, useCreateSellerMutation, useLoginUserMutation, useLoginSellerMutation } = authApi;