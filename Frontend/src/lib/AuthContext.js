"use client"

import {auth, provider} from "./firebase";
import {signInWithPopup, signOut, onAuthStateChanged} from "firebase/auth";
import {createContext, useContext, useEffect, useState} from "react";
import axiosInstance from "./axiosInstance";

export const UserContext = createContext()

export const UserProvider = ({children})=>{
    const [user , setUser] = useState(() => {
        if (typeof window !== "undefined") {
            const storedUser = localStorage.getItem("user");

            return storedUser
                ? JSON.parse(storedUser)
                : null;
        }
        return null;
    });

    const login = (userdata)=>{
        setUser(userdata)
        localStorage.setItem("user", JSON.stringify(userdata))
    }

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            localStorage.removeItem("user");

        } catch (error) {
            console.log(error);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const firebaseUser = result.user;
            const payload = {
                email: firebaseUser.email,
                name: firebaseUser.displayName,
                image: firebaseUser.photoURL,
            };
            const response = await axiosInstance.post(
                "/auth/login",
                payload
            );
            console.log(response.data);
            login(response.data.result);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(
            auth,
            async (firebaseUser) => {
                if (firebaseUser) {
                    try {
                        const payload = {
                            email: firebaseUser.email,
                            name: firebaseUser.displayName,
                            image: firebaseUser.photoURL,
                        };

                        const response = await axiosInstance.post(
                            "/auth/login",
                            payload
                        );
                        login(response.data.result);
                    } catch (error) {
                        console.error(error);
                        await logout();
                    }
                }
            }
        );

        return () => unsubscribe();

    }, []);
    return (
        <UserContext.Provider
            value={{
                user,
                login,
                logout,
                handleGoogleSignIn,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)
