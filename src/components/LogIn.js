import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { usernameValidation, passwordValidation } from '../utils/formValidation';
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
            setError('Username should contain 6 or more characters');
        } else if (passwordValidation(password)) {
            setError('Please enter a strong password');
        } else {
            setError('');
            console.warn('SUCCESS');
            logInHandler(username, password);
        }
    };

    const logInHandler = async (username, password) => {
        const { logInUser } = auth;
        logInUser(username, password);
    };

    return (
        <React.Fragment>
            {error && <Alert message={error}></Alert>}
            <form action='#' autoComplete='off' onSubmit={formSubmitHandler}>
                <div className='form-inputs'>
                    <div className='username-div input-div'>
                        <label htmlFor='username'>Username or Email</label>
                        <input type='text' id='username' ref={usernameElement} />
                    </div>
                    <div className='passwd-div input-div'>
                        <label htmlFor='passwd'>Password</label>
                        <input type='password' id='passwd' ref={passwdElement} />
                    </div>
                </div>
                <button type='submit'>Log In</button>
            </form>
            <p className='navigator'>
                Don't Have an Acoount?
                <Link to='/sign-up'>Sign Up</Link>
            </p>
        </React.Fragment>
    );
}

export default LogIn;
