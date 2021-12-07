import React from 'react';
import { Link } from 'react-router-dom';

function LogIn() {
    return (
        <React.Fragment>
            <form action='#' autoComplete='off'>
                <div className='form-inputs'>
                    <div className='username-div input-div'>
                        <label htmlFor='username'>Username or Email</label>
                        <input type='text' id='username' />
                    </div>
                    <div className='passwd-div input-div'>
                        <label htmlFor='passwd'>Password</label>
                        <input type='password' id='passwd' />
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
