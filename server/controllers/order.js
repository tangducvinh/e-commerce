const Order = require('../models/order')
const User = require('../models/user')
const asyncHandler = require('express-async-handler')

const createOrder = asyncHandler(async(req, res) => {
    const { _id } = req.user
    const { products, total, note } = req.body

    const result = await Order.create({products, total, postedBy: _id, note})

    return res.status(200).json({
        success: result ? true : false,
        data: result ? result : 'Can\'t create new order',
        mes: result ? 'Bạn đã mua hàng thành công' : 'Thực hiện mua hàng thất bại vui lòng thử lại sau'
    })
 
})

module.exports = {
    createOrder,
}