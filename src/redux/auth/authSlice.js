import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        token: null,
        detail: {},
    },
    reducers: {
        setToken(state, action) {
            state.isLoggedIn = true;
            state.token = action.payload.token;
        },
        setUserDetail(state, action) {
            state.detail = action.payload;
        },
        clearUser(state) {
            state.token = null;
            state.detail = {};
            state.isLoggedIn = false
        },
    },
});

export const { setToken, setUserDetail, clearUser } = authSlice.actions;

export default authSlice.reducer;
