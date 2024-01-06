

import axios from '../axios'

export const register = (data) => {
    return new Promise ( async(resolve, reject) => {
        try {
            const response = await axios({
                url: '/user/register',
                data,
                method: 'post',
            })
            resolve(response.data)
        } catch(e) {
            reject(e)
        }
    })
}

export const login = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            const response = await axios({
                url: '/user/login',
                data,
                method: 'post'
            })
            resolve(response.data)
        } catch(e) {
            reject(e)
        }
    })
}