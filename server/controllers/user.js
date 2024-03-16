const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt')
const jwt = require('jsonwebtoken')
const sendMail = require('../ultis/sendMail')
const crypto = require('crypto')
const uniqid = require('uniqid')
const { dataUsers } = require('../../data/mockUsers')

const register = asyncHandler(async(req, res) => {
    const { email, password, name, mobile } = req.body
    if (!email || !password || !mobile || !name) {
        return res.status(200).json({
            succees: false,
            mess: 'Vui lòng nhập đầy đủ thông tin'
        })
    }

    const user = await User.findOne({mobile})
    const checkEmail = await User.findOne({email})

    if (user || checkEmail) {
        if (user) {
            return res.status(200).json({
                success: false,
                mess: "Số điện thoại đã được sử dụng"
            })
        } else {
            return res.status(200).json({
                success: false,
                mess: "Email đã được sử dụng"
            })
        }
    }

    const token = uniqid()
    res.cookie('dataregister', { ...req.body, token }, {httpOnly: true, maxAge: 3*60*1000})
    const html = `Xin vui lòng click vào link dưới đây để xác thực email. Link này sẽ hết hiệu lực trong 3 phút kể từ bây giờ. 
    <a href=${process.env.URL_SERVER}api/user/final-register/${token}>Xác thực</a>`

    try {
        await sendMail({email, html, subject: 'Xác thực email'})

        return res.json({
            success: true,
            mess: "Check email để hoàn thành đăng kí tài khoản"
        })
    } catch {
        return res.json({
            success: false,
            mess: "Email đã nhập không tồn tại vui lòng thử lại"
        })
    }
})

const finalRegister = asyncHandler( async(req, res) => {
    const { token } = req.params
    const cookie = req.cookies

    try {
        if (cookie.dataregister.token === token) {
            const response =  await User.create({
                email: cookie.dataregister.email, 
                mobile: cookie.dataregister.mobile, 
                name: cookie.dataregister.name, 
                password: cookie.dataregister.password
            })
            if(response) {
                res.clearCookie('dataregister')
                return res.redirect(`${process.env.CLIENT_URL}/final_register/true`)
            }
        } else {
            res.clearCookie('dataregister')
            return res.redirect(`${process.env.CLIENT_URL}/final_register/false`)
        }
    } catch(e) {
        res.clearCookie('dataregister')
        return res.redirect(`${process.env.CLIENT_URL}/final_register/false`)
    }
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(200).json({
            sucess: false,
            mes: 'Missing inputs'
        })
    } else {
        let response
        if ( email.slice(0, 1) === '0' ) response = await User.findOne({mobile: email})
        else response = await User.findOne({email})

        let checkPassword
        if (response) checkPassword = await response.isCorrectPassword(password)
        
        if (response && checkPassword) {
            const { password, role, refreshToken, ...userData } = response.toObject()
            const accessToken = generateAccessToken(response._id, role)
            const newRefreshToken = generateRefreshToken(response._id)
            await User.findByIdAndUpdate(response._id, { refreshToken: newRefreshToken }, {new: true})
            res.cookie('refreshToken', newRefreshToken, {httpOnly: true, maxAge: 7*24*60*60*1000})
            return res.status(200).json({
                success: true,
                accessToken,
                userData,
            })
        } else {
            return res.status(200).json({
                success: false,
                mess: "Thông tin đăng nhập không đúng"
            })
        }
    }
})

const getCurrent = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const user = await User.findById(_id).select('-refreshToken -password').populate([
        {
            path: 'cart',
            populate: {
                path: 'product',
                select: 'images price title quanlity'
            }
        },
        {
            path: 'wishlist',
            select: 'images price ratings star title totalRatings'
        }
    ])
    return res.status(200).json({
        success: user ? true : false,
        rs: user ? user : "User not found"
    })
})

const getUser = asyncHandler(async(req, res) => {
    const { _id } = req.query

    if (!_id) return res.json({
        success: false,
        mes: 'Không tìm thấy người dùng nào'
    })

    const response = await User.findById(_id)

    return res.json({
        success: response ? true : false,
        data: response ? response : 'Không tìm thấy người dùng nào'
    })
})

const refreshAccessToken = asyncHandler(async(req, res) => {
    const cookie = req.cookies

    if (!cookie.refreshToken) throw new Error('No refresh token in cookies')
    jwt.verify(cookie.refreshToken, process.env.JWT_SECRET, async (err, decode) => {
        if (err) throw new Error('Invalid refresh token')
        else {
            const response = await User.findOne({_id: decode._id, refreshToken: cookie.refreshToken})
            return res.status(200).json({
                success: response ? true : false,
                newAccessToken: response ? generateAccessToken(response._id, response.role) : 'RefreshToken invalid',
            })
        }
    })
})

const logout = asyncHandler(async(req, res) => {
    const cookie = req.cookies
    
    if(!cookie.refreshToken) throw new Error('No refresh tokens in cookies')
    else await User.findOneAndUpdate({refreshToken: cookie.refreshToken}, {refreshToken: ''}, {new: true})
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
    })

    res.status(200).json({
        success: true,
        mess: "Logout is done",
    })
})

const forgotPassword = asyncHandler(async(req, res) => {
    const { email } = req.body
    if (!email) {
        return res.json({
            sucess: false,
            mes: 'Vui lòng nhập email để tiếP tục'
        })
    }
    const user = await User.findOne({email})
    if (!user) {
        return res.json({
            success: false,
            mes: 'Email chưa đặt đăng kí trước đó'
        })
    }
    const resetToken = user.createPasswordChangedToken()
    await user.save()

    const html = `Xin vui lòng click vào link sau đây để thay đổi mật khẩu của bạn. Link này có hiệu lực trong 15 phút. 
    <a href=${process.env.CLIENT_URL}/change_password/${resetToken}>Click here</a>`

    const data = {
        email: email,
        html: html,
        subject: 'Lấy lại mật khẩu'
    }

    await sendMail(data)
    return res.status(200).json({
        success: true,
        mes: 'Vui lòng check email để tiếp tục'
    })
})

const checkTokenResetPassword = asyncHandler(async(req, res) => {
    const { token, password } = req.body
    if(!token) {
        return res.json({
            success: false,
            mes: 'Đã quá thời gian để tạo mới. Vui lòng thử lại'
        })
    }

    passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({passwordResetToken, passwordResetExpire: {$gt: Date.now()}})
    if (!user) {
        return res.json({
            success: false,
            mes: 'Đã quá thời gian để tạo mới. Vui lòng thực hiện lại'
        })
    }
    user.password = password
    user.passwordResetToken = undefined
    user.passwordChangedAt = Date.now()
    user.passwordResetExpire = undefined
    await user.save()

    return res.status(200).json({
        success: true,
        mes: 'Mật khẩu đã được thay đổi vui lòng đăng nhập'
    })
})

const getAllUsers = asyncHandler((req, res) => {
    const queries = { ...req.query}
    console.log({queries})
    const excludeFields = ['limit', 'sort', 'page', 'fields']
    excludeFields.forEach(el => delete queries[el])

    let queryString = JSON.stringify(queries)
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, mactheEl => `$${mactheEl}`)
    const formatedQueries = JSON.parse(queryString)

    if (req.query.q) {
        delete formatedQueries.q
        formatedQueries['$or'] = [
            {email: {$regex: req.query.q, $options: 'i'}},
            {mobile: {$regex: req.query.q, $options: 'i'}},
        ]
    }
    let queryCommand = User.find(formatedQueries)

    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        queryCommand = queryCommand.sort(sortBy)
    }

    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ')
        queryCommand = queryCommand.select(fields)
    }

    const page = req.query.page || 1
    const limit = req.query.limit || 15
    const skip = (page - 1) * limit

    queryCommand.skip(skip).limit(limit)

    queryCommand.exec()
        .then(async(response) => {
            const counts = await User.find(formatedQueries).countDocuments()
            return res.json({
                success: response ? true : false,
                data: response ? response : 'Something went wrong',
                counts,
            })
        })

})

const mockDataUsers = asyncHandler(async(req, res) => {
    const response = await User.create(dataUsers)

    return res.json({
        success: response ? true : false,
        data: response ? response : 'Something went wrong'
    })
})

const deleteUser = asyncHandler(async(req, res) => {
    const { _id } = req.query
    if ( !_id ) throw new Error('User exited')
    const response = await User.findByIdAndDelete(_id)

    return res.status(200).json({
        success: response ? true : false,
        mes: response ? `Bạn đã xoá thành công tài khoản ${response.email}` : 'Thực hiện xoá không thành công vui lòng thử lại'
    })
})

const updateUser = asyncHandler(async(req, res) => {
    const { _id } = req.user
    const { mobile, name, address, addressDefault } = req.body 

    const response = await User.findByIdAndUpdate(_id, {mobile, name, address, addressDefault}, {new: true})
        .select('-refreshToken -password -role')
        .populate({
            path: 'cart',
            populate: {
                path: 'product',
                select: 'images title quanlity color price'
            }
        })

    return res.status(200).json({
        success: response ? true : false,
        data: response,
        mes: response ? 'Thực hiện thay đổi thông tin thành công' : 'Thực hiện thay đổi thông tin thất bại vui lòng thử lại sau'
    })
})

const updateUserByAdmin = asyncHandler(async(req, res) => {
    const { uid } = req.params
    if (!uid || Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    const response = await User.findByIdAndUpdate({_id: uid}, req.body, {new: true}).select('-password -role')
    
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? 'Đã thay đổi thanh tin thành công' : 'Thay đổi thông tin thất bị vui lòng thử lại sau',
    })
})

const updateAddressUser = asyncHandler(async(req, res) => {
    const { _id } = req.user
    const { city, county, ward, street } = req.body

    if (!_id || !city || !county || !street) throw new Error('Missing input')
    const response = await User.findByIdAndUpdate(_id, {$push: {address: {city, county, ward, street}}}, {new: true})

    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'Cant\'t upload address user',
        mes: response ? 'Thêm địa chỉ thành công' : 'Thực hiện thêm địa chỉ thất bại'
    })
})

// const deleteAddressUser = asyncHandler(async(req, res) => {
//     const { _id } = req.user
//     const { city, ward, county, street } = req.body
//     if (!_id || !city || !ward || !street || !county) {
//         return res.json({
//             success: false,
//             mes: 'Missing input'
//         })
//     }

//     const response = await User.findByIdAndUpdate(_id, {$pull: {address: {city, ward, county, street}}}, {new: true})

//     return res.json({
//         success: response ? true : false,
//         data: response ? response : 'No data',
//         mes: response ? 'Thực hiện xoá thành công' : 'Thực hiện xoá thất bại'
//     })
// })

const updateCart = asyncHandler(async(req, res) => {
    const { _id } = req.user
    const { pid, color } = req.body
    if (!pid) throw new Error('Missing inputs')
    const user = await User.findById(_id).select('cart')
    const alreadyProduct = user?.cart?.filter(item => item?.product?.toString() === pid)
    const currentProduct = alreadyProduct.find(item => item.color === color)

    if (!currentProduct) {
        const response = await User.findByIdAndUpdate(_id, {$push: {cart: {product: pid, quanlity: 1, color}}}, {new: true}).populate([
            {
                path: 'cart',
                populate: {
                    path: 'product',
                    select: 'images price title quanlity'
                }
            },
            {
                path: 'wishlist',
                select: 'images price ratings star title totalRatings'
            }
        ])
        return res.json({
            success: response ? true : false,
            data: response ? response : 'yet',
            mes: response ? 'Thêm sản phẩm vào giỏ hàng thành công' : 'Thêm sản phẩm vào giỏ hàng thất bại vui lòng thử lại sau'
        })
    } else {
        await User.findByIdAndUpdate(_id, {$pull: {cart: {product: pid, color}}}, {new: true})
        const response = await User.findByIdAndUpdate(_id, {$push: {cart: {product: pid, quanlity: currentProduct.quanlity + 1, color}}}, {new: true}).populate({
            path: 'cart',
            populate: {
                path: 'product',
                select: 'title price images'
            }
        })
        return res.status(200).json({
            success: response ? true : false,
            data: response ? response : 'yet',
            mes: response ? 'Thêm sản phẩm vào giỏ hàng thành công' : 'Thêm sản phẩm vào giỏ hàng thất bại vui lòng thử lại sau'
        })
    }
})

const updateQuanlityProductCart = asyncHandler(async(req, res) => {
    const { _id } = req.user
    const { pid, color, status } = req.body

    if (!pid || !status || !color) return res.json({success: false, mes: "Missing input"})

    const user = await User.findById(_id).select('cart')
    let order
    user.cart.forEach((item, index) => {
        if (item.product.toString() === pid && item.color === color) {
            order = index
        }
    })

    const response = await User.findByIdAndUpdate(_id, {$inc: {[`cart.${order}.quanlity`]: Number(status)}}, {new: true}).populate([
        {
            path: 'cart',
            populate: {
                path: 'product',
                select: 'images price title quanlity'
            }
        },
        {
            path: 'wishlist',
            select: 'images price ratings star title totalRatings'
        }
    ])

    return res.json({
        success: response ? true : false,
        data: response ? response : 'no data',
    })
})

const deleteProductCart = asyncHandler(async(req, res) => {
    const { pid, color, data } = req.body

    const { _id } = req.user

    // if (data) {
    //     data.forEach(async(item, index) => {
    //         await User.findByIdAndUpdate(_id, {$pull: {cart: {product: item.pid, color: item.color}}}, {new: true}).populate({
    //             path: 'cart',
    //             populate: {
    //                 path: 'product',
    //                 select: 'images price quanlity title'
    //             }
    //         })
    //     })
    // } else {
        response = await User.findByIdAndUpdate(_id, {$pull: {cart: {product: pid, color}}}, {new: true}).populate([
            {
                path: 'cart',
                populate: {
                    path: 'product',
                    select: 'images price title quanlity'
                }
            },
            {
                path: 'wishlist',
                select: 'images price ratings star title totalRatings'
            }
        ])
    // }

    return res.json({
        success: response ? true : false,
        data: response ? response : 'no data',
        mes: response ? 'Đã xoá sản phẩm khỏi giỏ hàng thàng công' : 'Thực hiện xoá thất bại vui lòng thử lại sau',
    })
})

const addWishList = asyncHandler(async(req, res) => {
    const { _id } = req.user
    const { pid, status } = req.body

    if (!_id || !pid) {
        return res.json({
            success: false,
            mes: 'Missing input'
        })
    }
    if (status === 1) {
        const response = await User.findByIdAndUpdate(_id, {$push: {wishlist: pid}}, {new: true}).populate([
            {
                path: 'cart',
                populate: {
                    path: 'product',
                    select: 'images price title quanlity'
                }
            },
            {
                path: 'wishlist',
                select: 'images price ratings star title totalRatings'
            }
        ])
        return res.json({
            success: response ? true : false,
            data: response ? response : 'no data',
            mes: response ? 'Bạn đã thêm vào danh sách yêu thích' : 'Thực hiện thêm vào danh sách yêu thích thất bại'
        })
    } else {
        const response = await User.findByIdAndUpdate(_id, {$pull: {wishlist: pid}}, {new: true}).populate([
            {
                path: 'cart',
                populate: {
                    path: 'product',
                    select: 'images price title quanlity'
                }
            },
            {
                path: 'wishlist',
                select: 'images price ratings star title totalRatings'
            }
        ])
        return res.json({
            success: response ? true : false,
            data: response ? response : 'no data',
            mes: response ? 'Bạn đã xoá khỏi danh sách yêu thích' : 'Thực hiện xoá khỏi danh sách yêu thích thất bại'
        })
    }
})

const addTitleSearched = asyncHandler(async(req, res) => {
    const { _id } = req.user
    const { title } = req.query

    if (!title) return res.json({
        success: false,
        mes: 'no title'
    })

    const check = await User.findById(_id)
    valueDelete = check.searcheds[0]
    if (check.searcheds.length >= 5) {
        await User.findByIdAndUpdate(_id, {$pull: {searcheds: valueDelete}}, {new: true})
    } 

    const response = await User.findByIdAndUpdate(_id, {$push: {searcheds: title}}, {new: true}).populate([
        {
            path: 'cart',
            populate: {
                path: 'product',
                select: 'images price title quanlity'
            }
        },
        {
            path: 'wishlist',
            select: 'images price ratings star title totalRatings'
        }
    ])

    return res.json({
        success: response ? true : false,
        mes: response ? 'Thêm thành công' : 'Thông thất bại',
        data: response ? response : 'no data'
    })
})

const removeAllTitleSearch = asyncHandler(async(req, res) => {
    const { _id } = req.user
    
    const response = await User.findByIdAndUpdate({_id: _id, searcheds: {$exists: true}}, {$set: {searcheds: []}}, {new: true}).populate([
        {
            path: 'cart',
            populate: {
                path: 'product',
                select: 'images price title quanlity'
            }
        },
        {
            path: 'wishlist',
            select: 'images price ratings star title totalRatings'
        }
    ])

    return res.json({
        success: response ? true : false,
        data: response ? response : 'No data',
        mes: response ? 'Xoá thành công' : 'Xoá thất bại vui lòng thực hiện lại'
    })
})

module.exports = {
    register,
    finalRegister,
    login,
    getCurrent,
    refreshAccessToken,
    logout,
    forgotPassword,
    checkTokenResetPassword,
    getAllUsers,
    deleteUser,
    updateUser,
    updateUserByAdmin,
    updateAddressUser,
    updateCart,
    getUser,
    mockDataUsers,
    deleteProductCart,
    updateQuanlityProductCart,
    addWishList,
    addTitleSearched,
    removeAllTitleSearch,
}