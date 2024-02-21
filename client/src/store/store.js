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

const commonConfig = {
    key: 'user',
    storage
}

const userConfig = {
    ...commonConfig,
    whitelist: ['isLoggedIn', 'token']
}

export const store = configureStore({
    reducer: {
        app: appSlice.reducer,
        user: persistReducer(userConfig, userSlice.reducer),
        product: productSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    })

export const persistor =  persistStore(store)
