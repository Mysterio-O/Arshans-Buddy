import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, deleteUser, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { AuthContext } from '../contexts/AuthContext';
import { auth } from '../firebase/firebase.init';





const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setLoading(false);
                // console.log('user from auth state change->', currentUser);
            } else {
                // console.log('user state from auth state->', currentUser);
                setUser(null);
            }
            setLoading(false);

            return () => {
                unSubscribe()
            }

        })
    }, []);

    const setUserProfile = object => {
        return updateProfile(auth.currentUser, object)
    }

    const userLogOut = () => {
        setLoading(true)
        return signOut(auth)
    }


    const deleteUserFirebase = ()=> {
        setLoading(true);
        return deleteUser(auth.currentUser)
    }


    const googleLogin = ()=> {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth,provider)
    }



    const contextValue = {
        createUser,
        loginUser,
        user,
        loading,
        setUserProfile,
        userLogOut,
        deleteUserFirebase,
        googleLogin
    }

    return <AuthContext value={contextValue}>
        {children}
    </AuthContext>
};

export default AuthProvider;