import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

import { appSlice } from './appSlice'
import { userSlice } from './userSlice'

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
        user: persistReducer(userConfig, userSlice.reducer)
    }
})

export const persistor =  persistStore(store)
