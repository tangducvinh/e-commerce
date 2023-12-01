const BlogCategory = require('../models/blogCategory')
const asyncHandler = require('express-async-handler')

const createBlog = asyncHandler(async(req, res) => {

    const response = await BlogCategory.create(req.body)

    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : "You don't create blog",
    })
})

const getBlogs = asyncHandler(async(req, res) => {
    
    const response = await BlogCategory.find()

    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'You don\'t get blogs'
    })
})
 
const updateBlog = asyncHandler(async(req, res) => {
    const { bid } = req.params

    const response = await BlogCategory.findByIdAndUpdate(bid, req.body, {new: true})

    return res.status(200).json({
        success: response ? true : false,
        mes: response ? response : 'You don\'t cant update'
    })
})

const deleteBlog = asyncHandler(async(req, res) => {
    const { bid } = req.params

    const response = await BlogCategory.findByIdAndDelete(bid)

    return res.status(200).json({
        success: response ? true : false,
        mes: response ? `Deleted blog category id ${response._id}` : 'You can\'t delete blog',
    })
})

module.exports = {
    createBlog,
    getBlogs,
    updateBlog,
    deleteBlog
}