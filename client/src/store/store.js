import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

import { appSlice } from './appSlice'
import { userSlice } from './userSlice'
import { productSlice } from './productSlice'

const userConfig = {
    key: 'user',
    storage,
    whitelist: ['isLoggedIn', 'token', 'dataCurrent']
}

export const store = configureStore({
    reducer: {
        app: appSlice.reducer,
        user: persistReducer(userConfig, userSlice.reducer),
        // product: persistReducer(productConfig, productSlice.reducer)
        product: productSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                serializableCheck: false,
            },
        }),
    })

export const persistor =  persistStore(store)
