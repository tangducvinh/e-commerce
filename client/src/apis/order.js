import axios from '../axios'

export const createOrder = async(data) => await axios({
    url: '/order',
    method: 'post',
    data
})