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
    const products = await Product.find()

    res.status(200).json({
        success: products ? true : false,
        data: products ? products : "Something went wrong"
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
    console.log(response)

    res.status(200).json({
        success: response ? true : false,
        mes: response ? `Deleted ${response._id}` : "Some thing went wrong"
    })
})

module.exports = {
    createProduct,
    getProduct,
    getAllProduct,
    updateProduct,
    deleteProduct
}
