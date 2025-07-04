import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useGetAdminProfileQuery } from '../services/adminApi';
import { toast } from 'react-toastify';

const AdminPrivateRoute = ({ requiredRole }) => { // Changed prop name for clarity
    const { data: adminProfile, isLoading, isError, error } = useGetAdminProfileQuery();

    if (isLoading) {
        return <div>Loading admin data...</div>;
    }

    if (isError) {
        console.error("AdminPrivateRoute fetch error:", error);

        let errorMessage = 'Session expired or unauthorized. Please log in again.';

        if (error.status === 403) {
            errorMessage = 'You do not have permission to access this resource.';
        } else if (error.status === 401) {
            errorMessage = 'Session expired or invalid. Please log in again.';
        }

        toast.error(errorMessage);
        return <Navigate to="/admin" replace />;
    }

    // Check if adminProfile exists AND if adminProfile.role is included in the requiredRole array
    const isAuthenticatedAndAuthorized = adminProfile && requiredRole.includes(adminProfile.role);

    return isAuthenticatedAndAuthorized ? <Outlet /> : <Navigate to="/admin" replace />;
};

export default AdminPrivateRoute;