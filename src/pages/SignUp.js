import React from 'react';

function SignUp() {
    return (
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
    );
}

export default SignUp;
