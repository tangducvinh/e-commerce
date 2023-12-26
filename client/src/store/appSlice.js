import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { getApiCategory } from '../apis'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        categorys: {
            status: 'idle',
            data: []
        },
    },
    reducers: {
        getCategory: (state, action) => {
            state.categorys = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fecthCategory.pending, (state, action) => {
            state.categorys.status = 'loading'
        }).addCase(fecthCategory.fulfilled, (state, action) => {
            state.categorys.data = action.payload
            state.categorys.status = 'idle'
        })
    }
})

export const fecthCategory = createAsyncThunk('app/fecthCategory', async () => {
    const response = await getApiCategory()

    return response
})