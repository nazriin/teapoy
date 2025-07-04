import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({
        // Backend server address
        baseUrl: 'http://localhost:5000/api/category',
        prepareHeaders: (headers) => {
            headers.set('content-type', 'application/json');
            // Token əlavə et (əgər varsa)
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Category'],
    endpoints: (builder) => ({
        // Get all categories with pagination
        getCategories: builder.query({
            query: ({ page = 1, limit = 10 } = {}) => `?page=${page}&limit=${limit}`,
            providesTags: ['Category'],
        }),

        // Get category by ID
        getCategoryById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: 'Category', id }],
        }),

        // Create new category
        createCategory: builder.mutation({
            query: (newCategory) => ({
                url: '/create',
                method: 'POST',
                body: newCategory,
            }),
            invalidatesTags: ['Category'],
            transformErrorResponse: (response) => {
                console.error('Create Category Error:', response);
                return {
                    status: response.status,
                    data: response.data || { message: 'Unknown error occurred' }
                };
            },
        }),

        // Update category
        updateCategory: builder.mutation({
            query: ({ id, ...updatedCategory }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: updatedCategory,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Category', id }],
            transformErrorResponse: (response) => {
                console.error('Update Category Error:', response);
                return {
                    status: response.status,
                    data: response.data || { message: 'Unknown error occurred' }
                };
            },
        }),

        // Delete category
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Category'],
            transformErrorResponse: (response) => {
                console.error('Delete Category Error:', response);
                return {
                    status: response.status,
                    data: response.data || { message: 'Unknown error occurred' }
                };
            },
        }),

        // Search categories
        searchCategories: builder.query({
            query: (searchTerm) => `/search?q=${encodeURIComponent(searchTerm)}`,
            providesTags: ['Category'],
        }),

        // Get category statistics
        getCategoryStats: builder.query({
            query: () => '/stats',
            providesTags: ['Category'],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useGetCategoryByIdQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useSearchCategoriesQuery,
    useGetCategoryStatsQuery,
} = categoryApi;