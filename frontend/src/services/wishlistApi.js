// src/services/wishlistApi.js (or wherever you prefer to store your API slices)
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const wishlistApi = createApi({
    reducerPath: 'wishlistApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/wishlist' }), // **Adjust your base URL as needed**
    tagTypes: ['Wishlist'], // Define tag types for invalidation
    endpoints: (builder) => ({
        // GET /api/wishlist/:userId
        getWishlistItems: builder.query({
            query: (userId) => `/${userId}`,
            providesTags: (result, error, userId) =>
                result
                    ? [...result.data.map(({ _id }) => ({ type: 'Wishlist', id: _id })), { type: 'Wishlist', id: 'LIST' }]
                    : [{ type: 'Wishlist', id: 'LIST' }],
        }),

        // POST /api/wishlist/add
        addWishlistItem: builder.mutation({
            query: ({ userId, productId }) => ({
                url: '/add',
                method: 'POST',
                body: { userId, productId },
            }),
            invalidatesTags: [{ type: 'Wishlist', id: 'LIST' }], // Invalidate the list after adding
        }),

        // PUT /api/wishlist/edit/:id
        editWishlistItem: builder.mutation({
            query: ({ id, productId }) => ({
                url: `/edit/${id}`,
                method: 'PUT',
                body: { productId },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Wishlist', id }], // Invalidate the specific item and potentially the list
        }),

        // DELETE /api/wishlist/delete/one/:id
        deleteWishlistItem: builder.mutation({
            query: (id) => ({
                url: `/delete/one/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Wishlist', id }, { type: 'Wishlist', id: 'LIST' }], // Invalidate the specific item and the list
        }),

        // DELETE /api/wishlist/delete/all/:userId
        deleteAllWishlistItems: builder.mutation({
            query: (userId) => ({
                url: `/delete/all/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Wishlist', id: 'LIST' }], // Invalidate the entire list
        }),
    }),
});

// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints
export const {
    useGetWishlistItemsQuery,
    useAddWishlistItemMutation,
    useEditWishlistItemMutation,
    useDeleteWishlistItemMutation,
    useDeleteAllWishlistItemsMutation,
} = wishlistApi;