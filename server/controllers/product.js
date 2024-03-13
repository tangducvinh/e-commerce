const Product = require('../models/product')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')

const createProduct = asyncHandler(async(req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const response = await Product.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? 'Đã thực hiện thông sản phẩm thành công' : 'Thực hiện thêm sản phẩm bị thất bại vui lòng thực hiện lại sau',
    })
})

const getProduct = asyncHandler(async(req, res) => {
    const pid = req.query.pid
    if(!pid) throw new Error("input missing")
    const product = await Product.findById({_id: pid}).populate({
        path: 'ratings',
        populate: {
            path: 'postedBy',
            select: 'name'
        }
    })

    return res.status(200).json({
        success: product ? true : false,
        data: product ? product : "Something went wrong"
    })
})

const getProductSearch = asyncHandler(async(req, res) => {
    const { title } = req.query

    if (!title) return res.json({
        success: false,
        mes: 'no search'
    })

    const response = await Product.find({title: {$regex: title, $options: 'i'}})

    return res.json({
        success: response ? true : false,
        data: response ? response : 'no data',
    })
})

const getAllProduct = asyncHandler(async(req, res) => {
    const queries = {...req.query}
    // splice expect field
    const excludeFields = ['limit', 'sort', 'fields', 'page']
    excludeFields.forEach(el => delete queries[el])

    let queryString = JSON.stringify(queries)

    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, el => `$${el}`)
    const formatedQueries = JSON.parse(queryString)

    // Filtering
    if (queries?.title) formatedQueries.title = {$regex: queries.title, $options: 'i'}

    console.log(formatedQueries)
    let queryCommand = Product.find(formatedQueries)

    // Sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        queryCommand = queryCommand.sort(sortBy)
    }

    // Fields limiting
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ')
        queryCommand = queryCommand.select(fields)
    }

    // Pagination
    const page = +req.query.page || 1
    const limit = +req.query.limit || process.env.LIMIT_PRODUCTS
    const skip = (page - 1) * limit
    queryCommand.skip(skip).limit(limit)


    queryCommand.exec()
        .then(async(response) => {
            const counts = await Product.find(formatedQueries).countDocuments()
        
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

const updateProduct = asyncHandler(async(req, res) => {
    const { pid } = req.params

    if (Object.keys(req.body).length === 0) throw new Error('Missing input')
    if (req.body.title) req.body.slug = slugify(req.body.title)
    const response = await Product.findByIdAndUpdate({_id: pid}, req.body, {new: true})

    res.status(200).json({
        success: response ? true : false,
        mes: response ? 'Thực hiện cập nhật thành công' : 'Thực hiện cập nhật thất bại vui lòng thử lại sau'
    })
})

const deleteProduct = asyncHandler(async(req, res) => {
    const { pid } = req.params

    const response = await Product.findByIdAndDelete({_id: pid})

    res.status(200).json({
        success: response ? true : false,
        mes: response ? 'Sản phẩm đã được xoá' : 'Thực hiện xoá không thành công vui lòng thử lại sau'
    })
})

const ratings = asyncHandler (async(req, res) => {
    const { _id } = req.user
    const { star, comment, pid, updatedAt} = req.body

    if (!star || !comment) {
        res.json({
            success: false,
            mes: 'Vui lòng nhập đầy đủ đánh giá sao và bình luận'
        })
    }

    const product = await Product.findById(pid)
    const alreadyRating = await product?.ratings.some((item) => item.postedBy.toString() === _id)

    if (alreadyRating) {
        await Product.findByIdAndUpdate(pid, {$pull: {ratings: {postedBy: _id}}})
    }
    
    const response = await Product.findByIdAndUpdate(pid, {$push: {ratings: {star, comment, postedBy: _id, updatedAt}}}, {new: true})

    let totalRating = response.ratings.reduce((total, current) => 
        total + current.star
    , 0) 

    const detailRatings = []
    for (let i = 1; i <= 5; i++) {
        let count = 0
        response.ratings.forEach((item) => {
            if (item.star === i) {
                count++;
            }
        })

        const percent = (count / response.ratings.length) * 100
        detailRatings.push({percent, count})
    }

    totalRating = (totalRating / response.ratings.length).toFixed(1)
    response.totalRatings = {
        rate: totalRating,
        totalUser: response.ratings.length,
        percents: detailRatings
    }
    await response.save()

    res.json({
        success: true,
        mes: 'Đánh giá sản phẩm thành công'
    })
})

const uploadImageProduct = asyncHandler(async(req, res) => {
    const { pid } = req.params

    if(!req.files) throw new Error("Missing inputs")
    const response = await Product.findByIdAndUpdate(pid, {$push: {images: {$each: req.files.map(item => item.path)}}}, {new: true})

    return res.status(200).json({
        status: response ? true : false,
        updateProduct: response ? response : "Can\'t upload images product"
    })
})


module.exports = {
    createProduct,
    getProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
    ratings,
    uploadImageProduct,
    getProductSearch,
}