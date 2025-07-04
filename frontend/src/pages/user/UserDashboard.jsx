import React, { useEffect } from 'react';
import { useGetCurrentUserQuery } from '../../services/authApi'; // Adjust the path as needed
import { useGetUserTrackingsQuery, getStatusColor, getStatusText, getStatusIcon } from '../../services/trackingApi'; // Import tracking API hooks and utilities

const UserProfile = () => {
    // Fetch user data using RTK Query hook
    const { data: userData, isLoading: isLoadingUser, isError: isErrorUser, error: userError } = useGetCurrentUserQuery();

    // Fetch user-specific tracking data
    const {
        data: userTrackingsData,
        isLoading: isLoadingTrackings,
        isError: isErrorTrackings,
        error: trackingsError
    } = useGetUserTrackingsQuery(userData?._id, {
        skip: !userData?._id, // Skip fetching if user ID is not available yet
    });

    // You can add a useEffect here if you need to perform actions once data is loaded
    useEffect(() => {
        if (userData) {
            console.log("User data loaded:", userData);
        }
        if (userTrackingsData) {
            console.log("User trackings loaded:", userTrackingsData);
        }
    }, [userData, userTrackingsData]);

    if (isLoadingUser || isLoadingTrackings) {
        return <div className="min-h-screen flex items-center justify-center text-lg text-gray-700">Loading user profile and orders...</div>;
    }

    if (isErrorUser) {
        return <div className="min-h-screen flex items-center justify-center text-lg text-red-600">Error loading profile: {userError?.data?.message || 'Unknown error'}</div>;
    }

    if (isErrorTrackings) {
        return <div className="min-h-screen flex items-center justify-center text-lg text-red-600">Error loading orders: {trackingsError?.data?.message || 'Unknown error'}</div>;
    }

    // Default values if userData is not available (though covered by isLoading/isError)
    const userDisplayName = userData?.name || 'Guest User';
    const userEmail = userData?.email || 'N/A';
    const userMemberSince = userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'N/A';
    const userPhone = userData?.phone || 'N/A';
    // NOTE: Your provided backend data for `userData` does not include `address`.
    // You might need to fetch this from another endpoint or ensure it's included in `useGetCurrentUserQuery`.
    const userAddress = userData?.address || 'N/A';
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userDisplayName)}&background=667eea&color=fff&rounded=true&bold=true`;

    // Transform tracking data into a format suitable for display as orders
    const userOrders = userTrackingsData?.data?.map(tracking => ({
        orderId: tracking._id,
        date: new Date(tracking.createdAt).toLocaleDateString(),
        // Use totalAmount from the backend data
        total: tracking.totalAmount ? tracking.totalAmount.toFixed(2) : 'N/A',
        status: tracking.status,
        items: tracking.items.map(item => ({
            // Copy existing item properties
            ...item,
            // Extract product name and price directly from productId for easier access
            name: item.productId.name,
            price: item.productId.price,
            imageUrl: item.productId.imageUrl || 'https://via.placeholder.com/64x64?text=No+Image',
            // imageUrl: `https://via.placeholder.com/64x64?text=${encodeURIComponent(item.productId.name)}`
            // You can also use a generic placeholder if you don't want dynamic text:
            // imageUrl: 'https://via.placeholder.com/64x64?text=Product',
        })) || [],
    })) || [];


    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Profile Header */}
                <div className="relative bg-gradient-to-r from-orange-400 to-orange-600 h-32 sm:h-48 flex items-end justify-center">
                    <img
                        src={avatarUrl}
                        alt="Profile"
                        className="absolute -bottom-16 w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white object-cover shadow-md"
                    />
                </div>

                {/* User Info Section */}
                <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{userDisplayName}</h1>
                    <p className="text-gray-600 text-sm sm:text-base mt-1">{userEmail}</p>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1">Member Since: {userMemberSince}</p>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Contact Information</h3>
                            <p className="text-gray-600"><span className="font-medium">Phone:</span> {userPhone}</p>
                            <p className="text-gray-600"><span className="font-medium">Address:</span> {userAddress}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Account Details</h3>
                            <p className="text-gray-600">You can add more account details here, e.g., payment methods, preferences.</p>
                            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>

                {/* User Orders Section (now using fetched data) */}
                <div className="px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">Your Orders</h2>

                    {userOrders.length === 0 ? (
                        <p className="text-center text-gray-600">You haven't placed any orders yet.</p>
                    ) : (
                        <div className="space-y-6">
                            {userOrders.map((order) => (
                                <div key={order.orderId} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 pb-2 border-b border-gray-100">
                                        <div className="mb-2 sm:mb-0">
                                            <h3 className="text-lg font-semibold text-gray-800">Order #{order.orderId}</h3>
                                            <p className="text-sm text-gray-600">Date: {order.date}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className={`font-semibold text-lg flex items-center gap-2 ${getStatusColor(order.status)} text-white px-3 py-1 rounded-full`}>
                                                {getStatusIcon(order.status)} {getStatusText(order.status)}
                                            </p>
                                            <p className="text-sm text-gray-700 mt-1">Total: ${order.total}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-700 mb-2">Items:</h4>
                                        <ul className="text-gray-600 text-sm"> {/* Removed list-disc pl-5 for custom layout */}
                                            {order.items.length === 0 ? (
                                                <li>No items found for this order.</li>
                                            ) : (
                                                order.items.map((item, index) => (
                                                    <li key={index} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-b-0">
                                                        {/* Product Image */}
                                                        <img
                                                            src={item.imageUrl}
                                                            alt={item.name}
                                                            className="w-16 h-16 object-cover rounded-md border border-gray-200 flex-shrink-0"
                                                        />
                                                        <div>
                                                            <p className="font-medium text-gray-800">{item.name} (x{item.quantity})</p>
                                                            <p className="text-gray-600">${item.price.toFixed(2)} each</p>
                                                        </div>
                                                    </li>
                                                ))
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;