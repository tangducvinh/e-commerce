const mongoose = require('mongoose')

var productSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        trim: true,
    },
    price: {
        type: Object,
    },
    priceSort: {
        type: Number,
    },
    incentives: {
        type: Array,
    },
    slug: {
        type: String,
        require: true,
        // unique: true,
        lowercase: true,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    quanlity: {
        type: Number,
        default: 0,
    },
    sold: {
        type: Number,
        default: 0,
    },
    images: {
        type: Array,
    },
    star: {
        type: Number,
        default: 0,
    },
    highlights: {
        type: Array,
    },
    information: {
        type: Array,
    },
    brand: {
        type: String,
    },
    variants: {
        type: Array,
    },
    version: {
        type: Array,
    },
    discount: {
        type: Number,
    },
    ratings: [
        {
            star: {type: Number},
            postedBy: {type: mongoose.Types.ObjectId, ref: 'User'},
            comment: {type: String},
            updatedAt: {type: Date, default: Date.now()}
        }
    ],
    totalRatings: {
        type: Object,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)
