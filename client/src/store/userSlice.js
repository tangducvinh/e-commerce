import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        token: null,
        dataCurrent: null
    },
    reducers: {
        register: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
            state.token = action.payload.token
        },
        logout: (state, action) => {
            state.isLoggedIn = false
            state.token = null
            state.dataCurrent = null
        },
        setDataUserCurrent: (state, action) => {
            state.dataCurrent = action.payload
        }
    },
})
