import { createSlice } from '@reduxjs/toolkit'

import swal from 'sweetalert'

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        render: false,
        cart: []
    },
    reducers: {
        setRender: (state, action) => {
            state.render = action.payload
        },
        addCart: (state, action) => {
            const data = {
                id: action.payload,
                amount: state.cart.filter(item => item.id === action.payload)[0]?.amount + 1 || 1,
            }

            state.cart = state.cart.filter(item => item.id !== action.payload)
            state.cart.unshift(data)
            swal('Congratulations', 'Bạn đã thêm vào giỏ hàng thành công', 'success')
        }
    }
})