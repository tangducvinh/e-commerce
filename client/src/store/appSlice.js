import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { getApiCategory, getHome, getProducts } from '../apis'
import { TfiQuoteLeft } from 'react-icons/tfi'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        categorys: {
            status: 'idle',
            data: []
        },
        banner: [],
        hotSales: [],
    },
    reducers: {
        getCategory: (state, action) => {
            state.categorys = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fecthCategory.pending, (state, action) => {
            state.categorys.status = 'loading'
        }).addCase(fecthCategory.fulfilled, (state, action) => {
            state.categorys.data = action.payload
            state.categorys.status = 'idle'
        })


        builder.addCase(fecthHome.fulfilled, (state, action) => {
            state.banner = action.payload[0].banner
        })

        builder.addCase(fecthProducts.fulfilled, (state, action) => {
            state.hotSales = action.payload
        })
    }
})

export const fecthCategory = createAsyncThunk('app/fecthCategory', async () => {
    const response = await getApiCategory()

    return response
})

export const fecthHome = createAsyncThunk('app/fecthHome', async() => {
    const response = await getHome()

    return response
})

export const fecthProducts = createAsyncThunk('app/fecthSmartphone', async(title) => {
    const response = await getProducts(title)

    return response
})