import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../store/authContext';

function Dashboard() {
    const auth = useAuth();
    const {
        currentUser: { displayName, email },
    } = auth;

    return (
        <section id='dashboard'>
            <h1>Dashboard</h1>
            <article>
                <div className='profile'>
                    <h2 className='username'>
                        Hello👋 <span>{displayName}</span>
                    </h2>
                    <h3 className='email'>{email}</h3>
                </div>
                <div className='action-btns'>
                    <button className='edit-profile'>
                        <Link to='/edit-profile'>Edit Profile</Link>
                        <span></span>
                    </button>
                    <button className='sign-out' onClick={auth.signOutUser}>
                        Sign Out
                    </button>
                </div>
            </article>
        </section>
    );
}

export default Dashboard;
