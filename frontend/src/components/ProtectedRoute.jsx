import React from 'react';
import { Navigate } from 'react-router-dom';
import { useGetCurrentUserQuery } from '../services/authApi';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { data: user, error, isLoading } = useGetCurrentUserQuery();

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (error || !user) {
        return <Navigate to={allowedRoles.includes('seller') ? '/seller/login' : '/user/login'} />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
