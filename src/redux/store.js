// redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { cartSlice } from './cart/cartSlice';
import { authSlice } from './auth/authSlice';
import { paymentSlice } from './payment/paymentSlice';
import { wishlistSlice } from './wishlist/wishlistSlice';
import { currencySlice } from './currency/currencySlice';
import dataReducer from './data/dataSlice'

const persistCartConfig = {
  key: 'cart',
  storage,
};

const persistAuthConfig = {
  key: 'auth',
  storage,
};

const persistPaymentConfig = {
  key: 'payment',
  storage,
};

const persistWishlistConfig = {
  key: 'wishlist',
  storage,
};

const persistCurrencyConfig = {
  key: 'currency',
  storage,
};
const persistDataConfig = {
  key: 'data',
  storage,
};

const persistedCartReducer = persistReducer(persistCartConfig, cartSlice.reducer);
const persistedAuthReducer = persistReducer(persistAuthConfig, authSlice.reducer);
const persistedPaymentReducer = persistReducer(persistPaymentConfig, paymentSlice.reducer);
const persistedWishlistReducer = persistReducer(persistWishlistConfig, wishlistSlice.reducer);
const persistedCurrencyReducer = persistReducer(persistCurrencyConfig, currencySlice.reducer);
const persistedDataReducer = persistReducer(persistDataConfig, dataReducer);

const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    auth: persistedAuthReducer,
    payment: persistedPaymentReducer,
    wishlist: persistedWishlistReducer,
    currency: persistedCurrencyReducer,
    data: persistedDataReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
