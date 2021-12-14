import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usernameValidation, emailValidation, passwordValidation } from '../utils/formValidation';
import { useAuth } from '../store/authContext';
import Alert from './Alert';

function SignUp() {
    const auth = useAuth();
    const usernameElement = useRef();
    const emailElement = useRef();
    const passwdElement = useRef();
    const [error, setError] = useState('');
    const [signinLoading, setSigninLoading] = useState(false);

    const formSubmitHandler = ev => {
        ev.preventDefault();
        const username = usernameElement.current.value;
        const email = emailElement.current.value;
        const password = passwdElement.current.value;
        validateForm(username, email, password);
    };

    const validateForm = (username, email, password) => {
        if (usernameValidation(username)) {
            setError('Username should contain 6 or more characters');
        } else if (emailValidation(email)) {
            setError('Email is not valid');
        } else if (passwordValidation(password)) {
            setError('Please enter a strong password');
        } else {
            setError('');
            console.warn('SUCCESS');
            signUpHandler(username, email, password);
        }
    };

    const signUpHandler = async (username, email, password) => {
        const { createUser, updateUserProfile, sendVerificationEmail, setDefaultProfilePicture } =
            auth;
        try {
            setSigninLoading(true);
            await createUser(email, password)
                .then(() => {
                    updateUserProfile(username);
                })
                .then(() => {
                    setDefaultProfilePicture();
                })
                .then(() => {
                    sendVerificationEmail();
                })
        } catch (error) {
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
                setError('Email has already been taken, Please log in');
            } else {
                setError('An error occured please try again later');
            }
            setSigninLoading(false);
        }
    };

    return (
        <section className='form-section'>
            {error && <Alert message={error}></Alert>}
            <form action='#' autoComplete='off' onSubmit={formSubmitHandler}>
                <div className='form-inputs'>
                    <div className='username-div input-div'>
                        <label htmlFor='username'>Username</label>
                        <input
                            type='text'
                            id='username'
                            ref={usernameElement}
                            placeholder='john doe'
                        />
                    </div>
                    <div className='email-div input-div'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            id='email'
                            ref={emailElement}
                            placeholder='example@example.com'
                        />
                    </div>
                    <div className='passwd-div input-div'>
                        <label htmlFor='passwd'>Password</label>
                        <input
                            type='password'
                            id='passwd'
                            ref={passwdElement}
                            placeholder='xxxxxx'
                        />
                    </div>
                </div>
                <button type='submit'>
                    {signinLoading ? (
                        <FontAwesomeIcon icon={faSpinner} className='loader' />
                    ) : (
                        <>Sign Up</>
                    )}
                </button>
            </form>
            <p className='navigator'>
                Already Have an Account?
                <Link to='/log-in'>Log In</Link>
            </p>
        </section>
    );
}

export default SignUp;
