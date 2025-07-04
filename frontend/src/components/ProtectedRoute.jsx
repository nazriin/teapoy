// src/components/ProtectedRoute.jsx
import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom'; // Import Outlet
import { useGetCurrentUserQuery } from '../services/authApi';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ requiredRole }) => {
    const { data: user, error, isLoading } = useGetCurrentUserQuery();

    useEffect(() => {
        if (error) {
            if (error.status === 401 || error.status === 403) {
            } else {
                toast.error(error?.data?.message || 'Authentication failed. Please log in.');
            }
        } else if (user && requiredRole && user.role !== requiredRole) {
            toast.error(`You are not authorized to access this page as a ${requiredRole}`);
        }
    }, [error, user, requiredRole]);

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (error || !user) {
        return <Navigate to="/user/login" replace />; // Use replace to prevent going back to protected route
    }

    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/unauthorized" replace />; // Use replace
    }

    return <Outlet context={{ userId: user._id }} />;
};

export default ProtectedRoute;