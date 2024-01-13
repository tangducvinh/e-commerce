import axios from '../axios'

export const getDetailProduct = (pid) => {
    return new Promise(async(resolve, reject) => {
        try {
            const response = await axios({
                url: 'product/infor-product',
                method: 'get',
                params: {
                    pid
                }
            })
            resolve(response.data.data)
        } catch(e) {
            reject(e)
        }
    })
}

export const getAllProducts = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            const response = await axios({
                url: 'product/infor-all-product',
                params: data,
                method: 'get'
            })
            resolve(response.data.data)
        } catch(e) {
            reject(e)
        }
    })
}