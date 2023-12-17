import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        error: null,
    },
    reducers: {
        setUser: ( state, action ) => {
            state.user = action.payload;
            state.error = null;
        },
        setError: ( state, action ) => {
            state.error = action.payload;
        },
        clearError: ( state ) => {
            state.error = null;
        },
        logout: ( state ) => {
            state.user = null;
            state.error = null;
        },
    },
});

export const { setUser, setError, clearError, logout } = authSlice.actions;

export default authSlice.reducer;
