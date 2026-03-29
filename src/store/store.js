
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import chatHistoryReducer from './chatHistorySlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        chatHistory: chatHistoryReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});