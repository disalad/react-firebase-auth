import React from 'react';
import { useAuth } from '../store/authContext';

function VerifyEmail() {
    const auth = useAuth();

    const hideEmail = function (email) {
        return email.replace(/(.{2})(.*)(?=@)/, function (gp1, gp2, gp3) {
            for (let i = 0; i < gp3.length; i++) {
                gp2 += '*';
            }
            return gp2;
        });
    };

    return (
        <section className='verify-email'>
            <h1>
                A verification link has been sent to your email <br /> Please realod the page after
                you verified
            </h1>
            <h2>{hideEmail(auth.currentUser.email)}</h2>
            <button onClick={auth.signOutUser} className='sign-out'>
                Sign Out
            </button>
        </section>
    );
}

export default VerifyEmail;
