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