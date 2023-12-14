const Blog = require('../models/blog')
const asyncHandler = require('express-async-handler')

const createBlog = asyncHandler(async(req, res) => {
    const { title, description, category } = req.body
    
    if (!title || !description || !category) throw new Error('Missing inputs')
    const response = await Blog.create(req.body)

    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'Can\'t create blog' 
    })
})

const updateBlog = asyncHandler(async(req, res) => {
    const { bid } = req.params

    if (Object.keys(req.body).length === 0) throw new Error('Missing input')
    const response = await Blog.findByIdAndUpdate(bid, req.body, {new: true})

    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'Can\'t update',
    })
})

const getBlogs = asyncHandler(async(req, res) => {
    const response = await Blog.find()

    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : "Can't g33et333"
    })
})

const likeBlog = asyncHandler(async(req, res) => {
    const { _id } = req.user
    const { bid } = req.params

    if (!bid) throw new Error('Missing input')
    const blog = await Blog.findById(bid)

    const like = blog.likes.some(item => item.toString() === _id)
    const dislike = blog.dislikes.some(item => item.toString() === _id)

    if (like) {
        const response = await Blog.findByIdAndUpdate(bid, {$pull: {likes: _id}}, {new: true})

        return res.status(200).json({
            success: response ? true : false,
            data: response ? response : 'Can\'t get blog'
        })
    } else if (dislike) {
        await Blog.findByIdAndUpdate(bid, {$pull: {dislikes: _id}}, {new: true})
        const response = await Blog.findByIdAndUpdate(bid, {$push: {likes: _id}}, {new: true})

        return res.status(200).json({
            success: response ? true : false,
            data: response ? response : 'Can\'t get blog'
        })
    } else {
        const response = await Blog.findByIdAndUpdate(bid, {$push: {likes: _id}}, {new: true})

        return res.status(200).json({
            success: response ? true : false,
            data: response ? response : 'Can\'t get blog'
        })
    }
})

// like => cancel like => add dislike
// dis

const dislikeBlog = asyncHandler(async(req, res) => {
    const { _id } = req.user
    const { bid } = req.params

    if (!bid) throw new Error('Missing input')
    const blog = await Blog.findById(bid)

    const like = blog.likes.some(item => item.toString() === _id)
    const dislike = blog.dislikes.some(item => item.toString() === _id)

    if (dislike) {
        const response = await Blog.findByIdAndUpdate(bid, {$pull: {dislikes: _id}}, {new: true})

        return res.status(200).json({
            success: response ? true : false,
            data: response ? response : 'Can\'t get blog'
        })
    } else if (like) {
        await Blog.findByIdAndUpdate(bid, {$pull: {likes: _id}}, {new: true})
        const response = await Blog.findByIdAndUpdate(bid, {$push: {dislikes: _id}}, {new: true})

        return res.status(200).json({
            success: response ? true : false,
            data: response ? response : 'Can\'t get blog'
        })
    } else {
        const response = await Blog.findByIdAndUpdate(bid, {$push: {dislikes: _id}}, {new: true})

        return res.status(200).json({
            success: response ? true : false,
            data: response ? response : 'Can\'t get blog'
        })
    }
})

// check numberViews again
const excludeFields = '-refreshToken -passwrod -role -createAt -updateAt'
const getBlog = asyncHandler(async(req, res) => {
    const { bid } = req.params

    const response = await Blog.findByIdAndUpdate(bid, {$inc: {numberViews: 1}}, {new: true})
        .populate('likes', excludeFields)
        .populate('dislikes', excludeFields)

    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'Can\'t get blog'
    })
}) 

const deleteBlog = asyncHandler(async(req, res) => {
    const { bid } = req.params

    const response = await Blog.findByIdAndDelete(bid)

    return res.status(200).json({
        success: response ? true : false,
        data: response ? `Deleted blog id ${response._id}` : 'Can\'t deleted blog'
    })
})

const uploadImageBlog = asyncHandler(async(req, res) => {
    const { bid } = req.params
    if (!req.file) throw new Error("Mising input")

    const response = await Blog.findByIdAndUpdate(bid, {image: req.file.path}, {new: true})

    return res.status(200).json({
        status: response ? true : false,
        data: response ? response : 'Can\'t upload image',
    })  

})
module.exports = {
    createBlog,
    updateBlog,
    getBlogs,
    likeBlog,
    dislikeBlog,
    getBlog,
    deleteBlog,
    uploadImageBlog,
}