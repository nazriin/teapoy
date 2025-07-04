// /src/services/productApi.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// API servisini təyin edirik
export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/',
        credentials: 'include',
    }),
    refetchOnFocus: true,
    tagTypes: ['Product'], // Cache üçün tag
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: (category) => {
                let queryString = 'product/all';
                if (category) {
                    queryString += `?category=${category}`;
                }
                return queryString;
            },
            providesTags: (result = [], error, arg) => [
                'Product',
                ...result.map(({ _id }) => ({ type: 'Product', id: _id })),
            ],
        }),

        getSellerProducts: builder.query({
            query: () => 'product/seller',
            providesTags: (result = [], error, arg) => [
                'Product',
                ...result.map(({ _id }) => ({ type: 'Product', id: _id })),
            ],
        }),

        addProduct: builder.mutation({
            query: (newProduct) => ({
                url: 'product/add',
                method: 'POST',
                body: newProduct,
            }),
            invalidatesTags: ['Product'],
        }),

        updateProduct: builder.mutation({
            query: ({ productId, ...updatedProduct }) => ({
                url: `product/${productId}`,
                method: 'PUT',
                body: updatedProduct,
            }),
            invalidatesTags: (result, error, { productId }) => ['Product', { type: 'Product', id: productId }],
        }),

        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `product/${productId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, productId) => ['Product', { type: 'Product', id: productId }],
        }),

        getProductById: builder.query({
            query: (productId) => ({
                url: `product/${productId}`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'Product', id }],
        }),
    }),
});

export const {
    useGetAllProductsQuery,
    useGetSellerProductsQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetProductByIdQuery
} = productApi;