import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
// This component is used to protect routes that require authentication
const PrivateRoute = ({ children }) => {

    const { user, loading } = useAuth();
    const location = useLocation();
    // console.log(location);
    const from = location?.pathname;

    if (loading) {
        return "Loading..."; // You can replace this with a custom loader component
    }

    if (!user) {
        return <Navigate state={from} to='/login' />
    }

    return children
};

export default PrivateRoute;