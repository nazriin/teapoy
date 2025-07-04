// /src/services/blogCategoryApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const blogCategoryApi = createApi({
    reducerPath: 'blogCategoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/', // Make sure this matches your backend URL
        credentials: 'include',
    }),
    tagTypes: ['BlogCategory'],
    endpoints: (builder) => ({
        getBlogCategories: builder.query({
            query: () => 'blog-category', // Your existing route for getting all categories
            providesTags: (result) =>
                result?.data
                    ? [...result.data.map(({ _id }) => ({ type: 'BlogCategory', id: _id })), { type: 'BlogCategory', id: 'LIST' }]
                    : [{ type: 'BlogCategory', id: 'LIST' }],
        }),
        addBlogCategory: builder.mutation({
            query: (newCategory) => ({
                url: 'blog-category',
                method: 'POST',
                body: newCategory,
            }),
            invalidatesTags: [{ type: 'BlogCategory', id: 'LIST' }],
        }),
        updateBlogCategory: builder.mutation({
            query: ({ id, ...updatedCategory }) => ({
                url: `blog-category/${id}`,
                method: 'PUT',
                body: updatedCategory,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'BlogCategory', id: 'LIST' }, { type: 'BlogCategory', id }],
        }),
        deleteBlogCategory: builder.mutation({
            query: (id) => ({
                url: `blog-category/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'BlogCategory', id: 'LIST' }],
        }),
        // You might also want getBlogCategoryById if needed elsewhere
        getBlogCategoryById: builder.query({
            query: (id) => `blog-category/${id}`,
            providesTags: (result, error, id) => [{ type: 'BlogCategory', id }],
        }),
    }),
});

export const {
    useGetBlogCategoriesQuery,
    useAddBlogCategoryMutation,
    useUpdateBlogCategoryMutation,
    useDeleteBlogCategoryMutation,
    useGetBlogCategoryByIdQuery,
} = blogCategoryApi;