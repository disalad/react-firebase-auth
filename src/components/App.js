import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthContextProvider from '../store/authContext';
import SignUp from './SignUp';
import LogIn from './LogIn';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import VerifyRoute from './VerifyRoute';
import Dashboard from './Dashboard';
import EditProfile from './EditProfile';
import VerifyEmail from './VerifyEmail';
import NotFound404 from './NotFound404';
import '../css/main.css';

function App() {
    // PublicRoutes are not available for users who have already signed up.
    // PrivateRoutes are not available for users who haven't signed in.
    return (
        <AuthContextProvider>
            <BrowserRouter>
                <Routes>
                    {/*PrivateRoutes*/}
                    <Route exact path='/' element={<PrivateRoute />}>
                        <Route exact path='/' element={<Navigate to='/dashboard' />} />
                    </Route>
                    <Route exact path='/dashboard' element={<PrivateRoute />}>
                        <Route exact path='/dashboard' element={<Dashboard />} />
                    </Route>
                    <Route path='/edit-profile' element={<PrivateRoute />}>
                        <Route path='/edit-profile' element={<EditProfile />} />
                    </Route>

                    {/*PublicRoutes*/}
                    <Route path='/sign-up' element={<PublicRoute />}>
                        <Route path='/sign-up' element={<SignUp />} />
                    </Route>
                    <Route path='/log-in' element={<PublicRoute />}>
                        <Route path='/log-in' element={<LogIn />} />
                    </Route>

                    {/*VerifyRoute*/}
                    <Route path='/verify' element={<VerifyRoute />}>
                        <Route path='/verify' element={<VerifyEmail />} />
                    </Route>

                    {/* 404 Not Found */}
                    <Route path='*' exact element={<NotFound404 />} />
                </Routes>
            </BrowserRouter>
        </AuthContextProvider>
    );
}

export default App;
