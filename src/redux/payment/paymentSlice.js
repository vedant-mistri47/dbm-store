import { createSlice } from '@reduxjs/toolkit';

export const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        productDetails : [],
        userDetails: {},
    },
    reducers: {
        setUserDetail: (state , action) => {
            state.userDetails = action.payload
        },
        setProductDetails: (state, action) => {
            state.productDetails = action.payload
        },
        setPayment: (state , action) => {
            
        }
    },
});

export const { setUserDetail , setProductDetails , setPayment } = paymentSlice.actions;

export default paymentSlice.reducer;
