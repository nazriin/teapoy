import React, { useState } from 'react';
import {
    useGetAllTrackingsQuery,
    useUpdateTrackingStatusMutation
} from '../../services/trackingApi'; // Adjust the import path as needed

import {
    getStatusColor,
    getStatusText,
    getStatusIcon
} from '../../services/trackingApi'; // Assuming helpers are in the same file

// A simple spinner component for loading states
const Spinner = () => (
    <div className="border-4 border-gray-200 border-t-blue-500 rounded-full w-8 h-8 animate-spin"></div>
);

// Main dashboard component
const AdminTrackingDashboard = () => {
    const [page, setPage] = useState(1);

    // Fetch all trackings using the RTK Query hook
    const {
        data: trackingData,
        isLoading,
        isFetching,
        isError,
        error
    } = useGetAllTrackingsQuery({ page, limit: 10 });

    // Prepare the mutation hook for updating status
    const [
        updateTrackingStatus,
        { isLoading: isUpdatingStatus }
    ] = useUpdateTrackingStatusMutation();

    // Handler for changing the status via the dropdown
    const handleStatusChange = async (trackingId, newStatus) => {
        if (!trackingId || !newStatus) return;
        try {
            // Call the mutation
            await updateTrackingStatus({ trackingId, status: newStatus }).unwrap();
            // Optionally, show a success toast notification here
        } catch (err) {
            console.error('Failed to update status:', err);
            // Optionally, show an error toast notification here
        }
    };

    // All possible statuses for the dropdown menu
    const statusOptions = [
        'order_placed', 'payment_confirmed', 'preparing_order',
        'in_transit', 'out_for_delivery', 'delivered',
        'cancelled', 'returned'
    ];

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <Spinner />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="text-center text-red-500">
                    <h2 className="text-2xl font-bold mb-2">Error Fetching Data</h2>
                    <p>{error?.data?.message || 'An unexpected error occurred.'}</p>
                </div>
            </div>
        );
    }

    const trackings = trackingData?.data || [];
    const totalPages = trackingData?.totalPages || 1;

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Tracking Dashboard</h1>

                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tracking ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change Status</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {trackings.length > 0 ? (
                                trackings.map((track) => (
                                    <tr key={track._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-700">{track.trackingId}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{track.customerName || 'N/A'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full text-white ${getStatusColor(track.status)}`}>
                                                    {getStatusIcon(track.status)} {getStatusText(track.status)}
                                                </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(track.updatedAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <select
                                                value={track.status}
                                                onChange={(e) => handleStatusChange(track._id, e.target.value)}
                                                disabled={isUpdatingStatus}
                                                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md disabled:bg-gray-200 disabled:cursor-not-allowed"
                                            >
                                                {statusOptions.map(option => (
                                                    <option key={option} value={option}>
                                                        {getStatusText(option)}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-sm text-gray-500">
                                        No tracking records found.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination Controls */}
                <div className="mt-6 flex items-center justify-between">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1 || isFetching}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <span className="text-sm text-gray-700">
                        Page {page} of {totalPages} {isFetching && <span className="animate-pulse">...</span>}
                    </span>
                    <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages || isFetching}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminTrackingDashboard;