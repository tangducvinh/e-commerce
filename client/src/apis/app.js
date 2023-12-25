import axios from '../axios'

export const apiGetCategory = () => axios({
    url: '/product-category',
    method: 'get'
})