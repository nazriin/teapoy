// src/pages/WishlistPage.jsx
import React from 'react';
import {
    useGetWishlistItemsQuery,
    useDeleteWishlistItemMutation,
    useDeleteAllWishlistItemsMutation,
} from '../../services/wishlistApi';
import { FaTrash, FaHeartBroken } from 'react-icons/fa';
import {useOutletContext} from "react-router-dom"; // For icons, install react-icons: npm install react-icons

const WishlistPage = () => {
    // Replace with actual user ID from your authentication system
    const { userId } = useOutletContext() || {};

    const { data, error, isLoading, isSuccess, refetch } = useGetWishlistItemsQuery(userId);
    const [deleteWishlistItem, { isLoading: isDeletingItem }] = useDeleteWishlistItemMutation();
    const [deleteAllWishlistItems, { isLoading: isDeletingAll }] = useDeleteAllWishlistItemsMutation();

    const handleDeleteItem = async (wishlistItemId) => {
        try {
            await deleteWishlistItem(wishlistItemId).unwrap();
            // RTK Query's invalidation will automatically refetch
            console.log('Item deleted successfully!');
        } catch (err) {
            console.error('Failed to delete item:', err);
            alert(`Error deleting item: ${err.data?.message || err.error}`);
        }
    };

    const handleClearWishlist = async () => {
        if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
            try {
                await deleteAllWishlistItems(userId).unwrap();
                // RTK Query's invalidation will automatically refetch
                console.log('Wishlist cleared successfully!');
            } catch (err) {
                console.error('Failed to clear wishlist:', err);
                alert(`Error clearing wishlist: ${err.data?.message || err.error}`);
            }
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-xl font-semibold text-gray-700">Loading Wishlist...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-red-100 text-red-700 p-4 rounded-lg shadow-md">
                <p className="text-xl font-semibold">Error loading wishlist: {error.data?.message || 'Something went wrong!'}</p>
                <button
                    onClick={refetch}
                    className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    Retry
                </button>
            </div>
        );
    }

    // This line correctly handles an empty array from the backend.
    // If data.data is null/undefined or an empty array, wishlistItems will be an empty array.
    const wishlistItems = isSuccess && data?.data ? data.data : [];

    return (
        <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Your Wishlist</h1>

            {wishlistItems.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-lg shadow-lg">
                    <FaHeartBroken className="mx-auto text-gray-400 text-6xl mb-4" />
                    <p className="text-2xl text-gray-600 font-medium">Your wishlist is empty!</p>
                    <p className="text-lg text-gray-500 mt-2">Start adding items you love.</p>
                </div>
            ) : (
                <>
                    <div className="flex justify-end mb-6">
                        <button
                            onClick={handleClearWishlist}
                            disabled={isDeletingAll}
                            className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-300 ease-in-out flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FaTrash />
                            <span>{isDeletingAll ? 'Clearing...' : 'Clear All Items'}</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {wishlistItems.map((item) => (
                            <div key={item._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden flex flex-col">
                                <div className="relative h-48 w-full">
                                    <img
                                        src={item.productId.imageUrl || 'https://via.placeholder.com/150'}
                                        alt={item.productId.name}
                                        className="w-full h-full object-cover rounded-t-xl"
                                    />
                                    <div className="absolute top-3 right-3 bg-white bg-opacity-80 rounded-full p-2 shadow-md">
                                        <span className="text-lg font-bold text-indigo-600">${item.productId.price ? item.productId.price.toFixed(2) : 'N/A'}</span>
                                    </div>
                                </div>
                                <div className="p-5 flex-grow flex flex-col">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{item.productId.name || 'Unknown Product'}</h2>
                                    <p className="text-gray-600 text-sm mb-4">Quantity: {item.count}</p>
                                    <div className="mt-auto"> {/* Pushes button to the bottom */}
                                        <button
                                            onClick={() => handleDeleteItem(item._id)}
                                            disabled={isDeletingItem}
                                            className="w-full px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <FaTrash />
                                            <span>{isDeletingItem ? 'Removing...' : 'Remove from Wishlist'}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default WishlistPage;