// src/services/authApi.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setAuth, clearAuth } from './authSlice';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api',
        credentials: 'include',
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (data) => ({
                url: '/login',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    // Safely access user and role, provide default if undefined
                    const user = data.user;
                    const role = data.user?.role; // Use optional chaining here
                    if (user && role) { // Only set auth if user and role are present
                        dispatch(setAuth({ user, role }));
                    } else {
                        // If user or role is missing, consider it a failed login for auth state
                        dispatch(clearAuth()); // Clear auth state if data is incomplete
                    }
                } catch (error) {
                    console.error('Login failed:', error);
                    dispatch(clearAuth()); // Ensure auth state is cleared on login failure
                }
            },
        }),
        getCurrentUser: builder.query({
            query: () => '/me',
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const user = data.user;
                    const role = data.user?.role; // Use optional chaining here
                    if (user && role) {
                        dispatch(setAuth({ user, role }));
                    } else {
                        dispatch(clearAuth()); // Clear auth state if data is incomplete
                    }
                } catch (error) {
                    console.error('Get current user failed:', error);
                    dispatch(clearAuth());
                }
            },
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(clearAuth());
                } catch (error) {
                    console.error('Logout failed:', error);
                    // Still clear auth state even if server logout fails to ensure frontend consistency
                    dispatch(clearAuth());
                }
            },
        }),
        requestOtpSignup: builder.mutation({
            query: (data) => ({
                url: '/request-otp-signup', // Adjust URL as per your backend API
                method: 'POST',
                body: data,
            }),
        }),
        verifyOtpRegister: builder.mutation({
            query: (data) => ({
                url: '/verify-otp-register',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    // FIX: Directly access user properties from 'data'
                    const user = { // Reconstruct the user object if your setAuth expects an object
                        _id: data._id,
                        name: data.name,
                        email: data.email,
                        role: data.role,
                        isVerified: data.isVerified,
                    };
                    const role = data.role; // Role is directly on data

                    if (user && role) {
                        dispatch(setAuth({ user, role }));
                    } else {
                        console.warn('OTP registration successful but user data or role is missing:', data);
                        dispatch(clearAuth());
                    }
                } catch (error) {
                    console.error('OTP registration failed:', error);
                    dispatch(clearAuth());
                }
            },
        }),
    }),
});

export const {
    useLoginUserMutation,
    useGetCurrentUserQuery,
    useLogoutUserMutation,
    useRequestOtpSignupMutation,
    useVerifyOtpRegisterMutation,
} = authApi;