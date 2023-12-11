const Product = require('../models/product')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')

const createProduct = asyncHandler(async(req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const newProduct = await Product.create(req.body)
    return res.status(200).json({
        success: newProduct ? true : false,
        createdProduct: newProduct ? newProduct : "Can't create new product"
    })
})

const getProduct = asyncHandler(async(req, res) => {
    const pid = req.query.pid
    if(!pid) throw new Error("input missing")
    const product = await Product.findById({_id: pid})

    return res.status(200).json({
        success: product ? true : false,
        data: product ? product : "Something went wrong"
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
        data: response ? response : "Something went wrong"
    })
})

const deleteProduct = asyncHandler(async(req, res) => {
    const { pid } = req.params

    const response = await Product.findByIdAndDelete({_id: pid})

    res.status(200).json({
        success: response ? true : false,
        mes: response ? `Deleted ${response._id}` : "Some thing went wrong"
    })
})

const ratings = asyncHandler(async(req, res) => {
    const {_id} = req.user 
    const {star, comment, pid} = req.body
    if (!star || !pid) throw new Error('Missing inputs')
    const ratingProduct = await Product.findById(pid)
    const alreadyRating = ratingProduct?.ratings?.find(item => item.postedBy.toString() === _id)

    if (alreadyRating) {
        await Product.updateOne({
            ratings: { $elemMatch: alreadyRating}
        }, {
            $set: { "ratings.$.star": star, "ratings.$.comment": comment}
        }, {new: true})
    } else {
        const response = await Product.findByIdAndUpdate(pid, {
            $push: {ratings: {star, comment, postedBy: _id}}
        }, {new: true})
    }

    const updateProduct = await Product.findById(pid)

    let sumRatings = 0
    updateProduct.ratings.forEach((item) => sumRatings += item.star)
    sumRatings = (sumRatings / updateProduct.ratings.length).toFixed(1)
    updateProduct.totalRatings = sumRatings
    await updateProduct.save()

    return res.status(200).json({
        status: true,
        data: updateProduct,
    })
})

const uploadImageProduct = asyncHandler(async(req, res) => {
    console.log(req.file)
    return res.status(200).json({
        success: "OKE",
    })
})

module.exports = {
    createProduct,
    getProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
    ratings,
    uploadImageProduct
}
