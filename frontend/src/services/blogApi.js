// /src/services/blogApi.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const blogApi = createApi({
    reducerPath: 'blogApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/',
        credentials: 'include', // vacibdir
    }),
    tagTypes: ['Blog'], // Cache üçün tag
    endpoints: (builder) => ({
        // Bütün blogları gətirmək
        getBlogs: builder.query({
            query: () => 'blogs',
            providesTags: (result) =>
                result?.data ? [...result.data.map(({ _id }) => ({ type: 'Blog', id: _id })), { type: 'Blog', id: 'LIST' }] : [{ type: 'Blog', id: 'LIST' }],
        }),
        // Yeni blog yaratmaq
        addBlog: builder.mutation({
            query: (newBlog) => ({
                url: 'blog',
                method: 'POST',
                body: newBlog, // newBlog artıq category-ni ehtiva edəcək
            }),
            invalidatesTags: [{ type: 'Blog', id: 'LIST' }], // Siyahını yeniləyir
        }),
        // Blogu yeniləmək
        updateBlog: builder.mutation({
            query: ({ blogId, ...updatedBlog }) => ({
                url: `blog/${blogId}`,
                method: 'PUT',
                body: updatedBlog, // updatedBlog artıq category-ni ehtiva edəcək
            }),
            invalidatesTags: (result, error, { blogId }) => [{ type: 'Blog', id: 'LIST' }, { type: 'Blog', id: blogId }],
        }),
        // Blogu silmək
        deleteBlog: builder.mutation({
            query: (blogId) => ({
                url: `blog/${blogId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Blog', id: 'LIST' }],
        }),
        // Tək blogu ID ilə gətirmək
        getBlogById: builder.query({
            query: (id) => `blog/${id}`,
            providesTags: (result, error, id) => [{ type: 'Blog', id }],
        }),
    }),
});

export const {
    useGetBlogsQuery,
    useAddBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation,
    useGetBlogByIdQuery, // Export the new hook
} = blogApi;