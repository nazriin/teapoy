import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api',
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        signupUser: builder.mutation({
            query: (data) => ({
                url: '/auth/register',
                method: 'POST',
                body: data,
            }),
        }),
        loginUser: builder.mutation({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data,
            }),
        }),
        getCurrentUser: builder.query({
            query: () => ({
                url: '/auth/me',
                method: 'GET',
                credentials: 'include',
            }),
        }),
    }),
});

export const { useSignupUserMutation, useLoginUserMutation, useGetCurrentUserQuery } = authApi;

