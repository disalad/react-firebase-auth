import React from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
    return (
        <React.Fragment>
            <form action='#' autoComplete='off'>
                <div className='form-inputs'>
                    <div className='username-div input-div'>
                        <label htmlFor='username'>Username</label>
                        <input type='text' id='username' />
                    </div>
                    <div className='email-div input-div'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' />
                    </div>
                    <div className='passwd-div input-div'>
                        <label htmlFor='passwd'>Password</label>
                        <input type='password' id='passwd' />
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
