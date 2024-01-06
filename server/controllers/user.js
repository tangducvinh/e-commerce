const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt')
const jwt = require('jsonwebtoken')
const sendMail = require('../ultis/sendMail')
const crypto = require('crypto')

const register = asyncHandler(async(req, res) => {
    const { email, password, name, mobile } = req.body
    if(!email || !password || !name || !mobile) {
        return res.status(200).json({
            success: false,
            mess: 'Vui lòng nhập thông tin đầy đủ'
        }) 
    } else {
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
        } else {
            const response = await User.create(req.body)
            console.log(response)
            return res.status(200).json({
                success: response ? true : false,
                mess: response ? 'Register is successfully. Please go login' : 'Something went wrong'
            })
        }
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
                mess: "Thông tin đăng nhập không đÚng"
            })
        }
    }
})

const getCurrent = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const user = await User.findById(_id).select('-refreshToken -password -role')
    return res.status(200).json({
        success: user ? true : false,
        rs: user ? user : "User not found"
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
    const { email } = req.query
    if (!email) throw new Error('Missing email')
    const user = await User.findOne({email})
    if (!user) throw new Error('User not found')
    const resetToken = user.createPasswordChangedToken()
    await user.save()

    const html = `Xin vui lòng click vào link sau đây để thay đổi mật khẩu của bạn. Link này có hiệu lực trong 15 phút. <a href=${process.env.URL_SERVER}api/user/reset-password/${resetToken}>Click here</a>`

    const data = {
        email: email,
        html: html,
    }

    const rs = await sendMail(data)
    return res.status(200).json({
        sucess: true,
        rs
    })
})

const checkTokenResetPassword = asyncHandler(async(req, res) => {
    const { token, password } = req.body
    if(!token || !password) throw Error("token or password empty")

    passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({passwordResetToken, passwordResetExpire: {$gt: Date.now()}})
    if (!user) throw new Error("Invalid reset token")
    user.password = password
    user.passwordResetToken = undefined
    user.passwordChangedAt = Date.now()
    user.passwordResetExpire = undefined
    await user.save()

    return res.status(200).json({
        success: true,
        mes: user ? 'Updated password' : 'Something went wrong'
    })
})

const getAllUsers = asyncHandler(async(req, res) => {   
    const response = await User.find({}).select('-refreshToken -password -role')

    return res.status(200).json({
        success: response ? true : false,
        mes: response ? response : 'Something went wrong'
    })
})

const deleteUser = asyncHandler(async(req, res) => {
    const { _id } = req.query
    if ( !_id ) throw new Error('User exited')
    const response = await User.findByIdAndDelete(_id)

    return res.status(200).json({
        success: response ? true : false,
        deleted: response ? `User with email ${response.email} deleted` : `No user delete`
    })
})

const updateUser = asyncHandler(async(req, res) => {
    const { _id } = req.user
    if(!_id || Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    const response = await User.findByIdAndUpdate(_id, req.body, {new: true}).select('-password -role')

    return res.status(200).json({
        success: response ? true : false,
        updateUser: response ? response : "Some thing went wrong"
    })
})

const updateUserByAdmin = asyncHandler(async(req, res) => {
    const { uid } = req.params
    if (!uid || Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    const response = await User.findByIdAndUpdate({_id: uid}, req.body, {new: true}).select('-password -role')
    
    return res.status(200).json({
        success: response ? true : false,
        updateUser: response ? response : 'Some thing went wrong'
    })
})

const updateAddressUser = asyncHandler(async(req, res) => {
    const { _id } = req.user

    if (!req.body.address) throw new Error('Missing input')
    const response = await User.findByIdAndUpdate(_id, {$push: {address: req.body.address}}, {new: true})

    return res.status(200).json({
        status: response ? true : false,
        data: response ? response : 'Cant\'t upload address user',
    })
})

const updateCart = asyncHandler(async(req, res) => {
    const { _id } = req.user
    const { pid, quantity, color } = req.body
    if (!pid || !quantity || !color) throw new Error('Missing inputs')
    const user = await User.findById(_id).select('cart')
    const alreadyProduct = user?.cart?.find(item => item.product.toString() === pid)

    if (alreadyProduct) {
        
    } else {
        const response = await User.findByIdAndUpdate(_id, {$push: {cart: {product: pid, quantity, color}}}, {new: true})
        return res.status(200).json({
            success: response ? true : false,
            data: response ? response : "Can\'t updated cart"
        })
    }


})

module.exports = {
    register,
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

}