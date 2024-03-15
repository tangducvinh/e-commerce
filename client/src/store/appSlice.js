import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { getApiCategory, getHome, getProducts } from '../apis'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        categorys: {
            status: 'idle',
            data: []
        },
        banner: [],
        hotSales: [],
        dataTheme: [],
        isLoading: false,
        showEditForm: false,
        idUserEdit: null,
        isChangeDataUsers: false,
        children: null,
        showOverlay: false,
        showOverlaySidebar: false,
    },
    reducers: {
        getCategory: (state, action) => {
            state.categorys = action.payload
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setShowEditForm: (state, action) => {
            state.showEditForm = action.payload
        },
        setIdUserEdit: (state, action) => {
            state.idUserEdit = action.payload
        },
        setIsChangeDataUsers: (state, action) => {
            state.isChangeDataUsers = action.payload
        },
        setChildren: (state, action) => {
            state.children = action.payload
        },
        setShowOverlay: (state, action) => {
            state.showOverlay = action.payload
        },
        setShowOverlaySidebar: (state, action) => {
            state.showOverlaySidebar = action.payload
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

        builder.addCase(fecthTheme.fulfilled, (state, action) => {
            state.dataTheme = action.payload
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

export const fecthTheme = createAsyncThunk('app/fecthTheme', async(data) => {
    const response = []

    for (let value of data) {
        const result = {}
        result.title = value.title
        result.row = value.row
        result.items = await getProducts(value.filter)
        response.push(result)
    }

    return response
})
