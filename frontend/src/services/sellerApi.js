import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const sellerApi = createApi({
    reducerPath: 'sellerApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api',
        credentials: 'include',
    }),
    tagTypes: ['Seller'],
    endpoints: (builder) => ({
        // SELLER LOGIN
        loginSeller: builder.mutation({
            query: (credentials) => {
                console.log('Sending login request with credentials:', credentials); // Log before sending
                return {
                    url: '/seller/login',
                    method: 'POST',
                    body: credentials,
                };
            },
            transformResponse: (response, meta, arg) => {
                console.log('Login response received:', response); // Log the raw response
                console.log('Login request arguments:', arg); // Log the arguments that were passed to the mutation

                if (response.token) {
                    localStorage.setItem('sellerToken', response.token);
                    console.log('Seller token saved:', response.token); // Log if token is saved
                } else {
                    console.warn('No token received in login response'); // Warn if no token
                }
                return response;
            },
            invalidatesTags: ['Seller'],
        }),

        // GET PROFILE
        getSellerProfile: builder.query({
            query: () => ({
                url: '/seller/profile',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('sellerToken')}`,
                },
            }),
            providesTags: ['Seller'],
        }),

        // UPDATE PROFILE
        updateSellerProfile: builder.mutation({
            query: (data) => ({
                url: '/seller/profile',
                method: 'PUT',
                body: data,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('sellerToken')}`,
                },
            }),
            invalidatesTags: ['Seller'],
        }),

        // GET DASHBOARD
        getSellerDashboard: builder.query({
            query: () => ({
                url: '/seller/dashboard',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('sellerToken')}`,
                },
            }),
            providesTags: ['Seller'],
        }),

        // LOGOUT
        logoutSeller: builder.mutation({
            query: () => ({
                url: '/seller/logout',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('sellerToken')}`,
                },
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    localStorage.removeItem('sellerToken');
                    console.log('Seller token removed');
                    dispatch(sellerApi.util.resetApiState());
                } catch (error) {
                    console.error('Logout failed:', error);
                }
            },
            invalidatesTags: ['Seller'],
        }),
    }),
});

export const {
    useLoginSellerMutation,
    useGetSellerProfileQuery,
    useUpdateSellerProfileMutation,
    useGetSellerDashboardQuery,
    useLogoutSellerMutation,
} = sellerApi;

export default sellerApi;