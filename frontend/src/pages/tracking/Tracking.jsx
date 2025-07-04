import React, { useState } from 'react';
import {
    Package,
    Truck,
    MapPin,
    Clock,
    CheckCircle,
    XCircle,
    Search,
    Calendar,
    Home,
    AlertCircle,
    RefreshCw
} from 'lucide-react';

import {
    useUpdateTrackingStatusMutation,
    getStatusColor,
    getStatusText,
    getStatusIcon
} from '../../services/trackingApi';

const TrackingSearch = ({ onSearch, isLoading }) => {
    const [trackingId, setTrackingId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (trackingId.trim()) {
            onSearch(trackingId.trim());
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Track Your Pet Order</h2>
                <p className="text-gray-600">Enter your tracking ID to see real-time updates</p>
            </div>

            <div className="max-w-md mx-auto">
                <div className="relative">
                    <input
                        type="text"
                        value={trackingId}
                        onChange={(e) => setTrackingId(e.target.value)}
                        placeholder="Enter tracking ID (e.g., PET-1735824934567-A7B9C2E5F)"
                        className="w-full px-6 py-4 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                        disabled={isLoading}
                        onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                    />
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="absolute right-2 top-2 bottom-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center disabled:opacity-50"
                    >
                        {isLoading ? (
                            <RefreshCw className="w-5 h-5 animate-spin" />
                        ) : (
                            <Search className="w-5 h-5" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

const StatusBadge = ({ status }) => {
    const color = getStatusColor(status);
    const text = getStatusText(status);
    const icon = getStatusIcon(status);

    return (
        <span className={`inline-flex items-center px-4 py-2 rounded-full text-white font-medium ${color}`}>
      <span className="mr-2">{icon}</span>
            {text}
    </span>
    );
};

const TrackingTimeline = ({ statusHistory }) => {
    const sortedHistory = [...statusHistory].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    return (
        <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

            {sortedHistory.map((event, index) => (
                <div key={index} className="relative flex items-start pb-8 last:pb-0">
                    <div className="absolute left-2 w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow-lg"></div>
                    <div className="ml-12">
                        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                                <StatusBadge status={event.status} />
                                <div className="flex items-center text-sm text-gray-500">
                                    <Clock className="w-4 h-4 mr-1" />
                                    {new Date(event.timestamp).toLocaleString()}
                                </div>
                            </div>

                            {event.location && (
                                <div className="flex items-center text-sm text-gray-600 mb-2">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {event.location}
                                </div>
                            )}

                            {event.notes && (
                                <p className="text-sm text-gray-700">{event.notes}</p>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const TrackingDetails = ({ tracking }) => {
    const [updateStatus] = useUpdateTrackingStatusMutation();
    const deliveryDate = new Date(tracking.estimatedDelivery);
    const isDelivered = tracking.status === 'delivered';
    const isCancelled = tracking.status === 'cancelled';

    const handleContactSupport = () => {
        // In a real app, this would open a support ticket or contact form
        alert('Support contact feature would be implemented here');
    };

    const handleModifyDelivery = () => {
        // In a real app, this would open a delivery modification form
        alert('Delivery modification feature would be implemented here');
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl font-bold mb-2">Tracking Details</h3>
                        <p className="text-purple-100">ID: {tracking.trackingId}</p>
                    </div>
                    <div className="text-right">
                        <StatusBadge status={tracking.status} />
                    </div>
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* Product Information */}
                <div className="border-b border-gray-200 pb-6">
                    <h4 className="text-lg font-semibold mb-3 flex items-center">
                        <Package className="w-5 h-5 mr-2 text-purple-500" />
                        Product Details
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h5 className="font-medium text-gray-900">{tracking.productDetails.name}</h5>
                                <p className="text-sm text-gray-500">Category: {tracking.productDetails.category}</p>
                                <p className="text-sm text-gray-500">Quantity: {tracking.productDetails.quantity}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-purple-600">${tracking.productDetails.price}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Delivery Information */}
                <div className="border-b border-gray-200 pb-6">
                    <h4 className="text-lg font-semibold mb-3 flex items-center">
                        <Truck className="w-5 h-5 mr-2 text-purple-500" />
                        Delivery Information
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                                <span className="text-sm font-medium text-gray-700">
                  {isDelivered ? 'Delivered' : 'Expected Delivery'}
                </span>
                            </div>
                            <p className={`text-lg font-semibold ${isDelivered ? 'text-green-600' : 'text-purple-600'}`}>
                                {deliveryDate.toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                                <Truck className="w-4 h-4 mr-2 text-gray-500" />
                                <span className="text-sm font-medium text-gray-700">Carrier</span>
                            </div>
                            <p className="text-lg font-semibold text-gray-900">{tracking.carrier.name}</p>
                            {tracking.carrier.trackingNumber && (
                                <p className="text-sm text-gray-500">#{tracking.carrier.trackingNumber}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Shipping Address */}
                <div className="border-b border-gray-200 pb-6">
                    <h4 className="text-lg font-semibold mb-3 flex items-center">
                        <Home className="w-5 h-5 mr-2 text-purple-500" />
                        Shipping Address
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start">
                            <MapPin className="w-4 h-4 mr-2 text-gray-500 mt-1" />
                            <div>
                                <p className="font-medium text-gray-900">{tracking.shippingAddress.street}</p>
                                <p className="text-gray-600">
                                    {tracking.shippingAddress.city}, {tracking.shippingAddress.state} {tracking.shippingAddress.zipCode}
                                </p>
                                <p className="text-gray-600">{tracking.shippingAddress.country}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Timeline */}
                <div>
                    <h4 className="text-lg font-semibold mb-4 flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-purple-500" />
                        Tracking History
                    </h4>
                    <TrackingTimeline statusHistory={tracking.statusHistory} />
                </div>

                {/* Action Buttons */}
                {!isDelivered && !isCancelled && (
                    <div className="flex flex-wrap gap-3 pt-4">
                        <button
                            onClick={handleContactSupport}
                            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium"
                        >
                            Contact Support
                        </button>
                        <button
                            onClick={handleModifyDelivery}
                            className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
                        >
                            Modify Delivery
                        </button>
                    </div>
                )}

                {isDelivered && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                        <h5 className="font-semibold text-green-800 mb-1">Package Delivered Successfully!</h5>
                        <p className="text-sm text-green-600">Thank you for shopping with us. We hope your pet loves their new items!</p>
                    </div>
                )}

                {isCancelled && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                        <XCircle className="w-12 h-12 text-red-500 mx-auto mb-2" />
                        <h5 className="font-semibold text-red-800 mb-1">Order Cancelled</h5>
                        <p className="text-sm text-red-600">This order has been cancelled. Please contact support for more information.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const TrackingNotFound = ({ trackingId }) => (
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Tracking Not Found</h3>
        <p className="text-gray-600 mb-4">
            We couldn't find any tracking information for ID: <code className="bg-gray-100 px-2 py-1 rounded">{trackingId}</code>
        </p>
        <p className="text-sm text-gray-500">
            Please check the tracking ID and try again, or contact support if you believe this is an error.
        </p>
    </div>
);

const TrackingError = ({ error, trackingId }) => (
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Tracking</h3>
        <p className="text-gray-600 mb-4">
            There was an error loading tracking information for: <code className="bg-gray-100 px-2 py-1 rounded">{trackingId}</code>
        </p>
        <p className="text-sm text-gray-500">
            {error.message || 'Please try again later or contact support if the problem persists.'}
        </p>
    </div>
);

const TrackingApp = () => {
    const [searchedTrackingId, setSearchedTrackingId] = useState(null);
    const [searchPerformed, setSearchPerformed] = useState(false);

    const handleSearch = (trackingId) => {
        setSearchedTrackingId(trackingId);
        setSearchPerformed(true);
    };

    const handleRetry = () => {
        if (searchedTrackingId) {
            refetch();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        🐾 Pet Shop Tracking
                    </h1>
                    <p className="text-gray-600">Track your pet's favorite products with real-time updates</p>
                </div>

                <TrackingSearch onSearch={handleSearch} isLoading={isLoading} />

                {searchPerformed && (
                    <>
                        {isLoading && (
                            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                                <RefreshCw className="w-16 h-16 text-purple-500 mx-auto mb-4 animate-spin" />
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Tracking Information...</h3>
                                <p className="text-gray-600">Please wait while we fetch your tracking details.</p>
                            </div>
                        )}

                        {error && !isLoading && (
                            <div className="space-y-4">
                                <TrackingError error={error} trackingId={searchedTrackingId} />
                                <div className="text-center">
                                    <button
                                        onClick={handleRetry}
                                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            </div>
                        )}

                        {trackingData?.data && !isLoading && (
                            <TrackingDetails tracking={trackingData.data} />
                        )}

                        {!trackingData?.data && !isLoading && !error && (
                            <TrackingNotFound trackingId={searchedTrackingId} />
                        )}
                    </>
                )}

                {!searchPerformed && (
                    <div className="mt-8">
                        <UserTrackingList userId={userId} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrackingApp;