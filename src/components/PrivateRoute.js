import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../store/authContext';

function PrivateRoute() {
    const { currentUser } = useAuth();
    if (currentUser !== null && !currentUser.emailVerified) {
        return <Navigate to='/verify' />;
    }
    return currentUser ? <Outlet /> : <Navigate to='/log-in' />;
}

export default PrivateRoute;
