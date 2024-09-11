import { configureStore } from '@reduxjs/toolkit';
import apiSlice from './apiSlice';

const store = configureStore({
    reducer: {
        api: apiSlice
    }
});

export default store;