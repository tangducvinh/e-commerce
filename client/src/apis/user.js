

import axios from '../axios'

export const register = (data) => {
    return new Promise ( async(resolve, reject) => {
        try {
            const response = await axios({
                url: '/user/register',
                data,
                method: 'post',
                withCredentials: true
            })
            resolve(response.data)
        } catch(e) {
            reject(e)
        }
    })
}

export const finalRegister = async(data) => await axios({
    url: 'user/final-register',
    params: data,
    method: 'get'
})

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

export const forgotPassword = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            const response = await axios({
                url: '/user/forgot-password',
                data,
                method: 'post'
            })
            resolve(response.data)
        } catch(e) {
            reject(e)
        }
    })
}

export const changePassword = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            const response = await axios({
                url: '/user/reset-password',
                method: 'post',
                data,
            })
            resolve(response.data)
        } catch (e) {
            reject(e)
        }
    })
}

export const getCurrentUser = () => {
    return new Promise(async(resolve, reject) => {
        try {
            const response = await axios({
                url: 'user/current',
                method: 'get',
            })

            resolve(response)
        } catch(e) {
            reject(e)
        }
    })
}

export const getInforUser = (_id) => {
    return new Promise(async(resolve, reject) => {
        try {
            const response = await axios({
                url: 'user/get-user',
                params: {
                    _id
                },
                method: 'get'
            })
            resolve(response.data.data)
        } catch(e) {
            reject(e)
        }
    })
}

export const getAllUsers = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            const response = await axios({
                url: 'user/get-all-users',
                params: data,
                method: 'get'
            })
            resolve(response.data)
        } catch(e) {
            reject(e)
        } 
    })
}

export const deleteUser = (uid) => {
    return new Promise(async(resolve, reject) => {
        try {
            const response = await axios({
                url: 'user/delete-user',
                params: uid,
                method: 'delete'
            })

            resolve(response.data)
        } catch(e) {
            reject(e)
        }
    })
}

export const updateUserByAdmin = (data, uid) => {
    return new Promise (async(resolve, reject) => {
        try {
            const response = await axios({
                url: 'user/update-user-by-admin/' + uid,
                data,
                method: 'put'
            })
            resolve(response.data)
        } catch (e) {
            reject(e)
        }
    })
}

export const updateUser = async(data) => await axios({
    url: 'user/update-user',
    data,
    method: 'put',
})

export const updateCart = async(data) => await axios({
    url: 'user/update-cart',
    data,
    method: 'put',
})

export const deleteProductCart = async(data) => await axios({
    url: 'user/delete-cart',
    data,
    method: 'delete'
})

export const updateQuanlityProductCart = async(data) => await axios({
    url: 'user/update-quanlity-product-cart',
    data,
    method: 'put'
})

// export const updataAddress = async(data) => await axios({
//     url: 'user/update-address',
//     data,
//     method: 'put'
// })

export const updateFavorite = async(data) => await axios({
    url: 'user/add-wishlist',
    data,
    method: 'put',
})

export const addListSearched = async(data) => await axios({
    url: 'user/title-searched',
    params: data,
    method: 'put',
})

export const removeAllTitleSearched = async() => await axios({
    url: 'user/delete-all-title-search',
    method: 'delete',
})
