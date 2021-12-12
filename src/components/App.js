import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthContextProvider from '../store/authContext';
import SignUp from './SignUp';
import LogIn from './LogIn';
import '../css/main.css';

function App() {
    return (
        <AuthContextProvider>
            <BrowserRouter>
                <section className='formParent'>
                    <Routes>
                        <Route path='/sign-up' element={<SignUp />} />
                        <Route path='/log-in' element={<LogIn />} />
                        <Route path='/' element={<LogIn />} />
                    </Routes>
                </section>
            </BrowserRouter>
        </AuthContextProvider>
    );
}

export default App;
