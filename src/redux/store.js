import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import pageReducer from './slices/PageSlice';

const persistConfig = {
    key: 'pages',
    storage,
    whitelist: ['pages'] // only persist the pages array
};

const persistedPageReducer = persistReducer(persistConfig, pageReducer);

export const store = configureStore({
    reducer: {
        pages: persistedPageReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

export const persistor = persistStore(store);
export default store;