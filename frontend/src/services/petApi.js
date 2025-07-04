// services/petAPI.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const petAPI = createApi({
    reducerPath: 'petAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/pets' }), // Adjust your base URL as needed
    tagTypes: ['Pet'],
    endpoints: (builder) => ({
        getAllPets: builder.query({
            query: () => '/',
            providesTags: ['Pet'],
        }),
        getPetById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: 'Pet', id }],
        }),
        addPet: builder.mutation({
            query: (newPet) => ({
                url: '/',
                method: 'POST',
                body: newPet,
            }),
            invalidatesTags: ['Pet'],
        }),
        updatePet: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Pet', id }],
        }),
        deletePet: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Pet'],
        }),
    }),
});

export const {
    useGetAllPetsQuery,
    useGetPetByIdQuery,
    useAddPetMutation,
    useUpdatePetMutation,
    useDeletePetMutation,
} = petAPI;