import { createSlice } from '@reduxjs/toolkit'

import swal from 'sweetalert'

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        render: false,
    },
    reducers: {
        setRender: (state, action) => {
            state.render = action.payload
        },
    }
})