import React, { useState } from 'react';
import { createContext } from 'react';
import app from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useEffect } from 'react';


export const AuthContext = createContext();
const auth = getAuth(app);

const UseContext = ({ children }) => {

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    const googleProvider = new GoogleAuthProvider();
    // google login 
    const googleSIngIn = () => {
        return signInWithPopup(auth, googleProvider);
    }


    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // sing in
    const singIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
            console.log('auth changed', currentUser);
        })
        return () => {
            unsubscribe()
        }

    }, [])


    // sing out
    const logOut = () => {
        signOut(auth)
            .then(() => { })
            .catch((error) => {
                // An error happened.
            });
    }


    const authInfo = { user, loading, createUser, singIn, googleSIngIn, logOut }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UseContext;