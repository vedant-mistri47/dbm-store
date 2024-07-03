import { createSlice } from '@reduxjs/toolkit';

export const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    currency: "INR",
    exchangeRates: 1
  },
  reducers: {
    changeCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setExchangeRates: (state , action) => {
      state.exchangeRates = action.payload;
    }
  },
});

export const { changeCurrency , setExchangeRates } = currencySlice.actions;

export default currencySlice.reducer;
