import React, { useState } from 'react';
import { useGetSellerProductsQuery } from '../../services/productApi.js';
import { useGetCategoriesQuery } from '../../services/categoryApi.js';
import { useGetCurrentUserQuery } from '../../services/authApi.js'; // Add this import
import ProductCard from "./components/ProductCard.jsx";
import ErrorDisplay from "./components/ErrorDisplay.jsx";
import Spinner from "./components/Spinner.jsx";
import ProductModal from "./components/ProductModal.jsx";

const SellerDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    // Get current user data
    const { data: currentUser, error: userError, isLoading: isLoadingUser } = useGetCurrentUserQuery();

    // Use seller ID from current user
    const sellerId = currentUser?.user || '';

    const { data: products, error, isLoading } = useGetSellerProductsQuery(sellerId);
    const { data: categories, error: categoriesError, isLoading: isLoadingCategories } = useGetCategoriesQuery();

    const handleOpenModal = (product = null) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    // Helper function to check if the error is just "no products found"
    const isNoProductsError = (error) => {
        const errorMessage = error?.data?.message?.toLowerCase() || '';
        return errorMessage.includes('no products') ||
            errorMessage.includes('not found') ||
            error?.status === 404;
    };

    // Show loading if user data is still loading
    if (isLoadingUser) {
        return (
            <div className="bg-gray-100 min-h-screen">
                <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                    <Spinner />
                </div>
            </div>
        );
    }

    // Show error if user data failed to load
    if (userError) {
        return (
            <div className="bg-gray-100 min-h-screen">
                <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                    <ErrorDisplay message={userError.data?.message || "Could not fetch user data."} />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Seller Dashboard</h1>
                    <button onClick={() => handleOpenModal()} className="mt-4 sm:mt-0 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-300">
                        + Add Product
                    </button>
                </header>

                {isLoading && <Spinner />}

                {error && !isNoProductsError(error) && (
                    <ErrorDisplay message={error.data?.message || "Could not fetch products."} />
                )}

                {!isLoading && !error && (
                    products?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.map(product => (
                                <ProductCard key={product._id} product={product} onEdit={handleOpenModal} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <h2 className="text-xl text-gray-600">You don't have any products yet.</h2>
                            <p className="text-gray-500 mt-2">Click "Add Product" to get started!</p>
                        </div>
                    )
                )}

                {/* Handle the case where error is "no products found" */}
                {!isLoading && error && isNoProductsError(error) && (
                    <div className="text-center py-16">
                        <h2 className="text-xl text-gray-600">You don't have any products yet.</h2>
                        <p className="text-gray-500 mt-2">Click "Add Product" to get started!</p>
                    </div>
                )}
            </div>
            <ProductModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                product={editingProduct}
                categories={categories || []}
                sellerId={sellerId} // Pass seller ID to modal if needed
            />
        </div>
    );
};

export default SellerDashboard;