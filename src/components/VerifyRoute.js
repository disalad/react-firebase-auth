import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../store/authContext';

function PrivateRoute() {
    const { currentUser } = useAuth();
    if (!currentUser) {
        return <Navigate to='/log-in' />;
    }
    return currentUser.emailVerified ? <Navigate to='/' /> : <Outlet />;
}

export default PrivateRoute;
