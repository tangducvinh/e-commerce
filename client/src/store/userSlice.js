import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import * as apis from '../apis'

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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fecthCurrentUser.fulfilled, (state, action) => {
            state.dataCurrent = action.payload
        })
    }
})

export const fecthCurrentUser = createAsyncThunk('user/fetchCurrent', async() => {
    const response = await apis.getCurrentUser()

    return response.data.rs
})
