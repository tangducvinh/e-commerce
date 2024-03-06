const Order = require('../models/order')
const User = require('../models/user')
const asyncHandler = require('express-async-handler')

const createOrder = asyncHandler(async(req, res) => {
    const { _id } = req.user
    const { products, total } = req.body

    const result = await Order.create({products, total, postedBy: _id})

    return res.status(200).json({
        success: result ? true : false,
        data: result ? result : 'Can\'t create new order',
    })
 
})


module.exports = {
    createOrder,
}