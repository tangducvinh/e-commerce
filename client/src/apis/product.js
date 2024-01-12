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