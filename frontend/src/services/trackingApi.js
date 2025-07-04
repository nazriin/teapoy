import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const trackingApi = createApi({
    reducerPath: 'trackingApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/tracking',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Tracking', 'TrackingStats'],
    endpoints: (builder) => ({
        // Create new tracking
        createTracking: builder.mutation({
            query: (trackingData) => ({
                url: '/create',
                method: 'POST',
                body: trackingData,
            }),
            invalidatesTags: ['Tracking', 'TrackingStats'],
        }),

        // Get tracking by tracking ID (public)
        getTrackingById: builder.query({
            query: (trackingId) => `/track/${trackingId}`,
            providesTags: (result, error, id) => [{ type: 'Tracking', id }],
        }),

        // Get user trackings
        getUserTrackings: builder.query({
            query: (userId) => `/user/${userId}`,
            providesTags: (result, error, userId) =>
                result?.data
                    ? [
                        ...result.data.map(({ _id }) => ({ type: 'Tracking', id: _id })),
                        { type: 'Tracking', id: `USER_${userId}` },
                    ]
                    : [{ type: 'Tracking', id: `USER_${userId}` }],
        }),

        // Update tracking status
        updateTrackingStatus: builder.mutation({
            query: ({ trackingId, ...statusData }) => ({
                url: `/update/${trackingId}`,
                method: 'PUT',
                body: statusData,
            }),
            invalidatesTags: (result, error, { trackingId }) => [
                { type: 'Tracking', id: trackingId },
                'TrackingStats',
            ],
        }),

        // Get all trackings (admin)
        getAllTrackings: builder.query({
            // The query function now takes no arguments and returns a static URL.
            query: () => '/all',

            providesTags: (result) =>
                result?.data
                    ? [
                        ...result.data.map(({ _id }) => ({ type: 'Tracking', id: _id })),
                        { type: 'Tracking', id: 'LIST' },
                    ]
                    : [{ type: 'Tracking', id: 'LIST' }],
        }),

        // Get tracking statistics
        getTrackingStats: builder.query({
            query: () => '/stats',
            providesTags: ['TrackingStats'],
        }),

        // Delete tracking
        deleteTracking: builder.mutation({
            query: (trackingId) => ({
                url: `/${trackingId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Tracking', 'TrackingStats'],
        }),
    }),
});

export const {
    useCreateTrackingMutation,
    useGetTrackingByIdQuery,
    useGetUserTrackingsQuery,
    useUpdateTrackingStatusMutation,
    useGetAllTrackingsQuery,
    useGetTrackingStatsQuery,
    useDeleteTrackingMutation,
} = trackingApi;

// Selectors
export const selectTrackingById = (state, trackingId) =>
    trackingApi.endpoints.getTrackingById.select(trackingId)(state);

export const selectUserTrackings = (state, userId) =>
    trackingApi.endpoints.getUserTrackings.select(userId)(state);

export const selectTrackingStats = (state) =>
    trackingApi.endpoints.getTrackingStats.select()(state);

// Transform functions for status display
export const getStatusColor = (status) => {
    const colors = {
        order_placed: 'bg-blue-500',
        payment_confirmed: 'bg-green-500',
        preparing_order: 'bg-yellow-500',
        in_transit: 'bg-purple-500',
        out_for_delivery: 'bg-orange-500',
        delivered: 'bg-green-600',
        cancelled: 'bg-red-500',
        returned: 'bg-gray-500',
    };
    return colors[status] || 'bg-gray-400';
};

export const getStatusText = (status) => {
    const texts = {
        order_placed: 'Order Placed',
        payment_confirmed: 'Payment Confirmed',
        preparing_order: 'Preparing Order',
        in_transit: 'In Transit',
        out_for_delivery: 'Out for Delivery',
        delivered: 'Delivered',
        cancelled: 'Cancelled',
        returned: 'Returned',
    };
    return texts[status] || 'Unknown Status';
};

export const getStatusIcon = (status) => {
    const icons = {
        order_placed: '📦',
        payment_confirmed: '✅',
        preparing_order: '🔄',
        in_transit: '🚚',
        out_for_delivery: '🚛',
        delivered: '🎉',
        cancelled: '❌',
        returned: '↩️',
    };
    return icons[status] || '❓';
};