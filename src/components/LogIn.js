import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { usernameValidation } from '../utils/formValidation';
import { useAuth } from '../store/authContext';
import Alert from './Alert';

function LogIn() {
    const auth = useAuth();
    const usernameElement = useRef();
    const passwdElement = useRef();
    const [error, setError] = useState('');

    const formSubmitHandler = ev => {
        ev.preventDefault();
        const username = usernameElement.current.value;
        const password = passwdElement.current.value;
        console.log('SUBMITTING...');
        validateForm(username, password);
    };

    const validateForm = (username, password) => {
        if (usernameValidation(username)) {
            setError('Please Enter a valid email');
        } else {
            setError('');
            console.warn('SUCCESS');
            logInHandler(username, password);
        }
    };

    const logInHandler = async (username, password) => {
        const { logInUser, sendVerificationEmail } = auth;
        try {
            await logInUser(username, password);
            await sendVerificationEmail();
        } catch (error) {
            setError('Invalid Email or Password');
        }
    };

    return (
        <section className='form-section'>
            {error && <Alert message={error}></Alert>}
            <form action='#' autoComplete='off' onSubmit={formSubmitHandler}>
                <div className='form-inputs'>
                    <div className='username-div input-div'>
                        <label htmlFor='username'>Email</label>
                        <input
                            type='text'
                            id='username'
                            ref={usernameElement}
                            placeholder='example@example.com'
                        />
                    </div>
                    <div className='passwd-div input-div'>
                        <label htmlFor='passwd'>Password</label>
                        <input
                            type='password'
                            id='passwd'
                            ref={passwdElement}
                            placeholder='xxxxxxx'
                        />
                    </div>
                </div>
                <button type='submit'>Log In</button>
            </form>
            <p className='navigator'>
                Don't Have an Acoount?
                <Link to='/sign-up'>Sign Up</Link>
            </p>
        </section>
    );
}

export default LogIn;
