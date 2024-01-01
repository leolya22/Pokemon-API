import { createSlice } from '@reduxjs/toolkit';

import { login, registerUser } from './thunks';


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        logout: ( state ) => {
            state.user = null;
            state.error = null;
        },
    },
    extraReducers: builder => {
        builder
        .addCase( login.pending, ( state ) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase( login.fulfilled, ( state, action ) => {
            state.status = 'succeeded';
            state.user = action.payload;
        })
        .addCase( login.rejected, ( state, action ) => {
            state.status = 'failed';
            state.error = action.error.message;
        })

        .addCase( registerUser.pending, ( state ) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase( registerUser.fulfilled, ( state, action ) => {
            state.status = 'succeeded';
            state.user = action.payload;
        })
        .addCase( registerUser.rejected, ( state, action ) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
