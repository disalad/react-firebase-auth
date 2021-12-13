import { createContext, useEffect, useContext, useState } from 'react';
import {
    onAuthStateChanged,
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import app from '../firebase';

const AuthContext = createContext();
const auth = getAuth();

export function useAuth() {
    return useContext(AuthContext);
}

function AuthContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
            console.warn(auth.currentUser);
        });
        return unsub;
    }, []);

    function createUser(email, password) {
        console.warn('CREATING USER');
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function updateUserProfile(displayName) {
        return updateProfile(auth.currentUser, {
            displayName,
        });
    }

    function sendVerificationEmail() {
        console.log(auth.currentUser.emailVerified);
        if (!auth.currentUser.emailVerified) {
            return sendEmailVerification(auth.currentUser).then(() => {
                console.log('Email Verification Sent...');
            });
        }
    }

    function logInUser(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function signOutUser() {
        return signOut(auth);
    }

    const values = {
        createUser,
        currentUser,
        updateUserProfile,
        sendVerificationEmail,
        logInUser,
        signOutUser,
    };

    if (loading) {
        return <>Loading...</>;
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
