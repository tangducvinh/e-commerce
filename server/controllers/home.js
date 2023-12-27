const Home = require('../models/home')
const asyncHandler = require('express-async-handler')

const addBanner = asyncHandler( async(req, res) => {
    
    const response = await Home.create({banner: req.body})

    return res.status(200).json({
        status: response ? true : false,
        data: response ? response : 'Can\'t add banner',
    })
})

const pushBanner = asyncHandler(async(req, res) => {
    const { hid } = req.params

    const response = await Home.findByIdAndUpdate(hid, {$push: {banner: req.body}}, {new: true})

    return res.status(200).json({
        status: response ? true : false,
        data: response ? response : "Can\'t push banner"
    })
})

const getHome = asyncHandler(async(req, res) => {
    const response = await Home.find()

    return res.status(200).json({
        status: response ? true : false,
        data: response ? response : 'Can\'t get home'
    })
})

const pushAdvantise = asyncHandler(async(req, res) => {
    const { hid } = req.params

    if (Object.keys(req.body).length === 0) throw new Error('Missing input')
    const response = Home.findByIdAndUpdate(hid, {$push: {advantise: req.body}}, {new: true})

    return res.status(200).json({
        status: response ? true : false,
        data: response ? response : 'Can\'t push image advantise'
    })
})

module.exports = {
    addBanner,
    pushBanner,
    getHome,
    pushAdvantise,
}