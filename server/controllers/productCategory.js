const ProductCategory = require('../models/productCategory')
const asyncHandler = require('express-async-handler')

const createCategory = asyncHandler(async(req, res) => {
    const response = await ProductCategory.create(req.body)

    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'Something went wrong',
    })
})

const getCategorys = asyncHandler(async(req, res) => {
    const response = await ProductCategory.find().select('title _id, category')

    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : "something went wrong"
    })
})

const updateCategory = asyncHandler(async(req, res) => {
    const { pcid } = req.params

    const response = await ProductCategory.findByIdAndUpdate(pcid, req.body, {new: true})

    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'something went wrong'
    })
})

const deleteCategory = asyncHandler(async(req, res) => {
    const { pcid } = req.params

    const response = await ProductCategory.findByIdAndDelete(pcid)

    return res.status(200).json({
        success: response ? true : false,
        mes: response ? `Deleted category has id ${response._id}` : "something went wrong",
    })
})

module.exports = {
    createCategory,
    getCategorys,
    updateCategory,
    deleteCategory,
}