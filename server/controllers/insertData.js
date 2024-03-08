const Product = require('../models/product')
const asyncHandler = require('express-async-handler')
const data = require('../../data/ecommerce.json')
const slugify = require('slugify')

const fn = async(product) => {
    const cleaned = product?.price?.sale.replace(/[^0-9.]/g, '')

    await Product.create({
        title: product?.name,
        slug: slugify(product?.name + Math.random() * 1000),
        variants: product?.variants,
        information: product?.information,
        highlights: product?.highlights,
        // star: product?.star,
        version: product?.version,
        quanlity: Math.round(Math.random() * 1000),
        sold: Math.round(Math.random() * 100),
        images: product?.images,
        discount: Math?.round(Math.random() * 50),
        price: product?.price,
        incentives: product?.incentives,
        category: product?.category,
        priceSort: Number(cleaned.replaceAll('.', ''))
    })
}

const insertDataProduct = asyncHandler(async(req, res) => {
    for (let product of data) {
        fn(product);
    }

    return res.status(200).json({
        success: "insert data successfull"
    })
})


module.exports = {
    insertDataProduct,
}