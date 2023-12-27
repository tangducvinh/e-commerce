import axios from '../axios'

export const getApiCategory = () => {
    return new Promise( async(resolve, reject) => {
        try {
            const response = await axios({
                url: '/product-category',
                mothod: 'get'
            })
            resolve(response.data.data)
        } catch(e) {
            reject(e)
        }
    })
}

export const getHome = () => {
    return new Promise( async(resolve, reject) => {
        try {
            const response = await axios({
                url: '/home',
                methold: 'get'
            })
            resolve(response.data.data)
        } catch(e) {
            reject(e)
        }
    })
}