import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import './css/main.css';

function App() {
    return (
        <BrowserRouter>
            <section className='formParent'>
                <Routes>
                    <Route path='/sign-up' element={<SignUp />} />
                    <Route path='/log-in' element={<LogIn />} />
                    <Route path='/' element={<LogIn />} />
                </Routes>
            </section>
        </BrowserRouter>
    );
}

export default App;
