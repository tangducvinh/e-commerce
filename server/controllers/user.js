const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt')

const register = asyncHandler(async(req, res) => {
    const { email, password, firstname, lastname } = req.body
    if(!email || !password || !lastname || !firstname) {
        return res.status(400).json({
            sucess: false,
            mes: 'Missing inputs'
        }) 
    } else {
        const user = await User.findOne({email: email})
        if (user) {
            throw new Error('User has existed!')
        } else {
            const response = await User.create(req.body)
            return res.status(200).json({
                sucess: response ? true : false,
                mes: response ? 'Register is successfully. Please go login' : 'Something went wrong'
            })
        }
    }
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({
            sucess: false,
            mes: 'Missing inputs'
        })
    } else {
        const response = await User.findOne({email})
        const checkPassword = await response.isCorrectPassword(password)
        
        if (response && checkPassword) {
            const { password, role, ...userData } = response.toObject()
            const accessToken = generateAccessToken(response._id, role)
            const refreshToken = generateRefreshToken(response._id)
            await User.findByIdAndUpdate(response._id, { refreshToken }, {new: true})
            res.cookie('refreshToken', refreshToken, {httpOnly: true, maxAge: 7*24*60*60*1000})
            return res.status(200).json({
                sucess: true,
                accessToken,
                userData,
            })
        } else {
            throw new Error('Invalid credentials')
        }
    }
})

const getCurrent = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const user = await User.findById(_id).select('-refreshToken -password -role')
    return res.status(200).json({
        success: false,
        rs: user ? user : "User not found"
    })
})

module.exports = {
    register,
    login,
    getCurrent
}