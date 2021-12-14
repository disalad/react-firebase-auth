import { createContext, useEffect, useContext, useState } from 'react';
import app from '../firebase';
import {
    onAuthStateChanged,
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import uploadImg from './firestore';

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
            console.warn(user);
        });
        return unsub;
    }, []);

    function createUser(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    async function updateUserProfile(username, imgUrl) {
        return updateProfile(auth.currentUser, {
            displayName: username,
            photoURL: imgUrl,
        });
    }

    function sendVerificationEmail() {
        if (!auth.currentUser.emailVerified) {
            return sendEmailVerification(auth.currentUser).then(() => {
                console.log('Email Verification Sent...');
            });
        } else {
            console.log('Already Verified');
        }
    }

    function setDefaultProfilePicture() {
        const imgUrl =
            'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg';
        return updateProfile(auth.currentUser, {
            photoURL: imgUrl,
        });
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
        setDefaultProfilePicture,
    };

    if (loading) {
        return <>Loading...</>;
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
