const Order = require('../models/order')
const User = require('../models/user')
const asyncHandler = require('express-async-handler')

const createOrder = asyncHandler(async(req, res) => {
    const { _id } = req.user
    const { products, total, note } = req.body

    const size = await Order.find().countDocuments()
    const result = await Order.create({products, total, orderBy: _id, note, indexOrder: size + 1})

    return res.status(200).json({
        success: result ? true : false,
        data: result ? result : 'Can\'t create new order',
        mes: result ? 'Bạn đã mua hàng thành công' : 'Thực hiện mua hàng thất bại vui lòng thử lại sau'
    })
 
})

const getUserOder = asyncHandler(async(req, res) => {
    const queries = {...req.query}
    const {_id} = req.user
    // splice expect field
    const excludeFields = ['limit', 'sort', 'fields', 'page']
    excludeFields.forEach(el => delete queries[el])

    let queryString = JSON.stringify(queries)

    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, el => `$${el}`)
    const formatedQueries = JSON.parse(queryString)

    // Filtering
    // if (queries?.title) formatedQueries.title = {$regex: queries.title, $options: 'i'}
    let queryCommand = Order.find({...formatedQueries, orderBy: _id}).populate({
        path: 'products',
        populate: {
            path: 'product',
            select: 'title images price'
        }
    })

    // // Sorting
    // if (req.query.sort) {
    //     const sortBy = req.query.sort.split(',').join(' ')
    //     queryCommand = queryCommand.sort(sortBy)
    // }

    // // Fields limiting
    // if (req.query.fields) {
    //     const fields = req.query.fields.split(',').join(' ')
    //     queryCommand = queryCommand.select(fields)
    // }

    // Pagination
    const page = +req.query.page || 1
    const limit = +req.query.limit || process.env.LIMIT_ORDER
    const skip = (page - 1) * limit
    queryCommand.skip(skip).limit(limit)

    queryCommand.exec()
        .then(async(response) => {
            const counts = await Order.find(queryCommand).countDocuments()
        
            return res.status(200).json({
                success: response ? true : false,
                data: response ? response : "Something went wrong",
                counts: counts,
            })
        })

        .catch(err => {
            throw new Error(err.message)
        })
})

module.exports = {
    createOrder,
    getUserOder,
}