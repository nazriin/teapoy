// src/services/basketApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const basketApi = createApi({
    reducerPath: 'basketApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/basket', // Base URL for all basket endpoints
    }),
    tagTypes: ['Basket'],
    endpoints: (builder) => ({
        // getBasketItems now accepts a userId and constructs the URL correctly
        getBasketItems: builder.query({
            query: (userId) => `/${userId}`, // Corrected: Path includes userId
            providesTags: (result) =>
                result && result.data // Assuming result.data is an array of basket items
                    ? [
                        ...result.data.map(({ _id }) => ({ type: 'Basket', id: _id })),
                        { type: 'Basket', id: 'LIST' },
                    ]
                    : [{ type: 'Basket', id: 'LIST' }],
        }),
        addItemToBasket: builder.mutation({
            query: ({ productId, count, userId }) => ({
                url: '/add', // This matches router.post('/basket/add')
                method: 'POST',
                body: { productId, count, userId },
            }),
            invalidatesTags: [{ type: 'Basket', id: 'LIST' }],
        }),
        // editBasketItem now includes userId in the request body
        editBasketItem: builder.mutation({
            query: ({ id, count, userId }) => ({
                url: `/${id}`, // Correct: Matches router.put('basket/:id')
                method: 'PUT',
                body: { count, userId }, // Include userId in body
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Basket', id },
                { type: 'Basket', id: 'LIST' },
            ],
        }),
        // deleteOneBasketItem now includes userId in the request body
        deleteOneBasketItem: builder.mutation({
            query: ({ id, userId }) => ({
                url: `/${id}`, // Correct: Matches router.delete('basket/:id')
                method: 'DELETE',
                body: { userId }, // Include userId in body
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Basket', id },
                { type: 'Basket', id: 'LIST' },
            ],
        }),
        deleteAllBasketItems: builder.mutation({
            query: ({ userId }) => ({
                url: `/all/${userId}`, // Correctly append userId to the URL as a parameter
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Basket', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetBasketItemsQuery,
    useAddItemToBasketMutation,
    useEditBasketItemMutation,
    useDeleteOneBasketItemMutation,
    useDeleteAllBasketItemsMutation,
} = basketApi;