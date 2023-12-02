const Brand = require('../models/brand')
const asyncHandler = require('express-async-handler')

const createBrand = asyncHandler(async(req, res) => {

    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    const response = await Brand.create(req.body)

    res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'Can\'t create brand'
    })
})

const getBrands = asyncHandler(async(req, res) => {
    const response = await Brand.find()

    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : "Can\'t get brand"
    })
})

const updateBrand = asyncHandler(async(req, res) => {
    const { bid } = req.params

    const response = await Brand.findByIdAndUpdate(bid, req.body, {new: true})

    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'Can\'t update brand'
    })
})

const deleteBand = asyncHandler(async(req, res) => {
    const { bid } = req.params

    const response = await Brand.findByIdAndDelete(bid)

    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : "Cant\'t delete"
    })
})


module.exports = {
    createBrand,
    getBrands,
    updateBrand,
    deleteBand
}