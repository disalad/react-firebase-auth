import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../store/authContext';

function PublicRoute() {
    const { currentUser } = useAuth();
    const hasEmailToken = window.localStorage.hasOwnProperty('emailForSignIn');
    if (hasEmailToken) {
        return <Navigate to='/verify' />;
    }
    return currentUser ? <Navigate to='/' /> : <Outlet />;
}

export default PublicRoute;
