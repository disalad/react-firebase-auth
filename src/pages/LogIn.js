import React from 'react';

function LogIn() {
    return (
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
    );
}

export default LogIn;
