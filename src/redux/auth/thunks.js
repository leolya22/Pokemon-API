import { createAsyncThunk } from "@reduxjs/toolkit";

import firebase from '../../config/firebase';


export const login = createAsyncThunk( 'auth/login', async ({ email, password }) => {
    const userCredential = await firebase.auth().signInWithEmailAndPassword( email, password );
    const { displayName, uid } = userCredential.user['_delegate'];
    return { displayName, email, uid };
});

export const registerUser = createAsyncThunk( 'auth/registerUser', async ({ name, email, password }) => {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword( email, password );
    const firebaseUser = userCredential.user;
    await firebaseUser.updateProfile({
        displayName: name,
    });
    const { displayName, uid } = firebaseUser;
    return { email, displayName, uid };
});