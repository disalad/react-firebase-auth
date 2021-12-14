import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../store/authContext';

function Dashboard() {
    const auth = useAuth();
    const [loading, setLoading] = useState(true);
    const {
        currentUser: { displayName, email, photoURL },
    } = auth;

    return (
        <section id='dashboard' className={loading ? 'skeleton' : ''}>
            <h1>Dashboard</h1>
            <article>
                <div className='profile'>
                    <div className='user-dp'>
                        <img
                            src={photoURL}
                            alt={`profile-dp of ${displayName}`}
                            onLoad={() => {
                                setLoading(false);
                            }}
                        />
                    </div>
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
