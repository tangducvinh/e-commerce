const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const verifyAccessToken = asyncHandler(async(req, res, next) => {
    // Bearer token
    if(req?.headers?.authorization) {
        const token = req.headers.authorization
        
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if(err) return res.status(401).json({
                success: false,
                mes: "Invalid access token"
            })
            req.user = decode
            next()
        })
    } else {
        return res.status(401).json({
            success: false,
            mes: 'Require authentication!!!'
        })
    }
})

module.exports = {
    verifyAccessToken
}