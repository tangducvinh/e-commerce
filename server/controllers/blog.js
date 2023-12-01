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

    res.status(200).json({
        success: response ? true : false,
        data: response ? response : "Can't get"
    })
})

// if like -> cancel like
// else if dislike => cancel dislike => add like
// else add like

const likeBlog = asyncHandler(async(req, res) => {
    const { _id } = req.user
    const { bid } = req.body

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
    const { bid } = req.body

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



module.exports = {
    createBlog,
    updateBlog,
    getBlogs,
    likeBlog,
    dislikeBlog
}