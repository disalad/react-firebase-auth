import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usernameValidation, emailValidation, passwordValidation } from '../utils/formValidation';

function SignUp() {
    const firstUpdate = useRef(true);
    const usernameElement = useRef();
    const emailElement = useRef();
    const passwdElement = useRef();
    const [usernameHasErr, usernameSetError] = useState(false);
    const [emailHasErr, emailSetError] = useState(false);
    const [passwdHasErr, passwdSetError] = useState(false);

    const formSubmitHandler = ev => {
        ev.preventDefault();
        const email = emailElement.current.value;
        const password = passwdElement.current.value;
        const username = usernameElement.current.value;
        usernameSetError(usernameValidation(username));
        emailSetError(emailValidation(email));
        passwdSetError(passwordValidation(password));
    };

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        if (!usernameHasErr && !emailHasErr && !passwdHasErr) {
            console.warn('SUCCESS');
        }
    });

    return (
        <React.Fragment>
            <form action='#' autoComplete='off' onSubmit={formSubmitHandler}>
                <div className='form-inputs'>
                    <div className='username-div input-div'>
                        <label htmlFor='username'>Username</label>
                        <input
                            type='text'
                            id='username'
                            className={usernameHasErr ? 'error' : ''}
                            ref={usernameElement}
                        />
                        {usernameHasErr && (
                            <p className={'error-text'}>
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                Username should contain 6 or more letters
                            </p>
                        )}
                    </div>
                    <div className='email-div input-div'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            id='email'
                            className={emailHasErr ? 'error' : ''}
                            ref={emailElement}
                        />
                        {emailHasErr && (
                            <p className={'error-text'}>
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                Email is invalid
                            </p>
                        )}
                    </div>
                    <div className='passwd-div input-div'>
                        <label htmlFor='passwd'>Password</label>
                        <input
                            type='password'
                            id='passwd'
                            className={passwdHasErr ? 'error' : ''}
                            ref={passwdElement}
                        />
                        {passwdHasErr && (
                            <p className={`error-text`}>
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                Password is not valid
                            </p>
                        )}
                    </div>
                </div>
                <button type='submit'>Sign Up</button>
            </form>
            <p className='navigator'>
                Already Have an Account?
                <Link to='/log-in'>Log In</Link>
            </p>
        </React.Fragment>
    );
}

export default SignUp;
