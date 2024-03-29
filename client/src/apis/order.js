import axios from '../axios'

export const createOrder = async(data) => await axios({
    url: '/order',
    method: 'post',
    data
})

export const getUserOder = async(data) => await axios({
    url: '/order',
    method: 'get',
    params: data
})

export const getOrders = async(data) => await axios({
    url: '/order/get-orders',
    method: 'get',
    params: data,
})