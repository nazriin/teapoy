import React, { useState, useEffect } from 'react';
import {
    Plus,
    Edit,
    Trash2,
    Search,
    Filter,
    ChevronLeft,
    ChevronRight,
    Calendar,
    Tag,
    TrendingUp,
    AlertCircle,
    CheckCircle,
    X
} from 'lucide-react';
import { toast } from 'react-toastify';

import {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useSearchCategoriesQuery,
    useGetCategoryStatsQuery
} from '../../../services/categoryApi.js';
import CategoryModal from './CategoryModal.jsx';
import DeleteModal from './DeleteModal.jsx';

const CategoryManagement = ({ showNotification }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] = useState(false);
    const [categoryModalMode, setCategoryModalMode] = useState('create');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const {
        data: categoriesData,
        isLoading: isCategoriesLoading,
        error: categoriesError
    } = useGetCategoriesQuery({ page: currentPage, limit: 10 }, {
        skip: debouncedSearchTerm // Skip if searching
    });

    const {
        data: searchData,
        isLoading: isSearchLoading,
        error: searchError
    } = useSearchCategoriesQuery(debouncedSearchTerm, {
        skip: !debouncedSearchTerm
    });

    const {
        data: statsData,
        error: statsError
    } = useGetCategoryStatsQuery();

    const [createCategory, { isLoading: isCreatingCategory }] = useCreateCategoryMutation();
    const [updateCategory, { isLoading: isUpdatingCategory }] = useUpdateCategoryMutation();
    const [deleteCategory, { isLoading: isDeletingCategory }] = useDeleteCategoryMutation();

    const categories = debouncedSearchTerm
        ? searchData?.data || []
        : categoriesData?.data || [];

    const totalCategoryPages = debouncedSearchTerm
        ? 1
        : categoriesData?.pagination?.totalPages || 1;

    // Category Handlers
    const handleCreateCategory = () => {
        setCategoryModalMode('create');
        setSelectedCategory(null);
        setIsCategoryModalOpen(true);
    };

    const handleEditCategory = (category) => {
        setCategoryModalMode('edit');
        setSelectedCategory(category);
        setIsCategoryModalOpen(true);
    };

    const handleDeleteCategory = (category) => {
        setSelectedCategory(category);
        setIsDeleteCategoryModalOpen(true);
    };

    const handleCategoryModalSubmit = async (formData) => {
        try {
            if (categoryModalMode === 'create') {
                await createCategory(formData).unwrap();
                showNotification('success', 'Category created successfully!');
            } else {
                await updateCategory({ id: selectedCategory._id, ...formData }).unwrap();
                showNotification('success', 'Category updated successfully!');
            }
            setIsCategoryModalOpen(false);
        } catch (error) {
            console.error('Error saving category:', error);
            const errorMessage = error?.data?.message || 'An error occurred while saving the category';
            showNotification('error', errorMessage);
        }
    };

    const handleDeleteCategoryConfirm = async () => {
        try {
            await deleteCategory(selectedCategory._id).unwrap();
            showNotification('success', 'Category deleted successfully!');
            setIsDeleteCategoryModalOpen(false);
        } catch (error) {
            console.error('Error deleting category:', error);
            const errorMessage = error?.data?.message || 'An error occurred while deleting the category';
            showNotification('error', errorMessage);
        }
    };

    const handleCategoryPageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="mb-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm border mb-6">
                <div className="p-6 border-b">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Category Management</h2>
                            <p className="text-gray-600 mt-1">Manage your categories efficiently</p>
                        </div>
                        <button
                            onClick={handleCreateCategory}
                            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Add Category
                        </button>
                    </div>
                </div>

                {/* Error Display for Categories */}
                {(categoriesError || searchError || statsError) && (
                    <div className="p-4 bg-red-50 border-l-4 border-red-500">
                        <div className="flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-red-600" />
                            <span className="text-red-800 font-medium">Error loading category data</span>
                        </div>
                        <p className="text-red-700 text-sm mt-1">
                            {categoriesError?.data?.message ||
                                searchError?.data?.message ||
                                statsError?.data?.message ||
                                'Unable to connect to the server for categories. Please check your connection.'}
                        </p>
                    </div>
                )}

                {/* Stats Cards for Categories */}
                {statsData && (
                    <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-blue-50 rounded-lg p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Tag className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Total Categories</p>
                                    <p className="text-2xl font-bold text-gray-900">{statsData.data.totalCategories}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Recent Categories</p>
                                    <p className="text-2xl font-bold text-gray-900">{statsData.data.recentCategories}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">This Week</p>
                                    <p className="text-2xl font-bold text-gray-900">{statsData.data.lastWeek}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Search and Filters for Categories */}
            <div className="bg-white rounded-lg shadow-sm border mb-6">
                <div className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search categories..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <button className="inline-flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors">
                            <Filter className="w-4 h-4" />
                            Filter
                        </button>
                    </div>
                </div>
            </div>

            {/* Categories Table */}
            <div className="bg-white rounded-lg shadow-sm border">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="text-left p-4 font-medium text-gray-900">Name</th>
                            <th className="text-left p-4 font-medium text-gray-900 hidden md:table-cell">Description</th>
                            <th className="text-left p-4 font-medium text-gray-900 hidden sm:table-cell">Created</th>
                            <th className="text-right p-4 font-medium text-gray-900">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {(isCategoriesLoading || isSearchLoading) ? (
                            <tr>
                                <td colSpan="4" className="p-8 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                        Loading categories...
                                    </div>
                                </td>
                            </tr>
                        ) : categories.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="p-8 text-center text-gray-500">
                                    {searchTerm ? 'No categories found matching your search.' : 'No categories found.'}
                                </td>
                            </tr>
                        ) : (
                            categories.map((category) => (
                                <tr key={category._id} className="border-b hover:bg-gray-50">
                                    <td className="p-4">
                                        <div className="font-medium text-gray-900">{category.name}</div>
                                        <div className="md:hidden text-sm text-gray-500 mt-1">
                                            {category.description || 'No description'}
                                        </div>
                                    </td>
                                    <td className="p-4 hidden md:table-cell">
                                        <div className="text-gray-600">
                                            {category.description || 'No description'}
                                        </div>
                                    </td>
                                    <td className="p-4 hidden sm:table-cell">
                                        <div className="text-gray-600">
                                            {formatDate(category.createdAt)}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleEditCategory(category)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteCategory(category)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination for Categories */}
                {!debouncedSearchTerm && totalCategoryPages > 1 && (
                    <div className="flex items-center justify-between p-4 border-t">
                        <div className="text-sm text-gray-600">
                            Page {currentPage} of {totalCategoryPages}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleCategoryPageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handleCategoryPageChange(currentPage + 1)}
                                disabled={currentPage === totalCategoryPages}
                                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Modals */}
            <CategoryModal
                isOpen={isCategoryModalOpen}
                onClose={() => setIsCategoryModalOpen(false)}
                onSubmit={handleCategoryModalSubmit}
                initialData={selectedCategory}
                mode={categoryModalMode}
                isLoading={isCreatingCategory || isUpdatingCategory}
            />

            <DeleteModal
                isOpen={isDeleteCategoryModalOpen}
                onClose={() => setIsDeleteCategoryModalOpen(false)}
                onConfirm={handleDeleteCategoryConfirm}
                categoryName={selectedCategory?.name}
                isLoading={isDeletingCategory}
            />
        </div>
    );
};

export default CategoryManagement;