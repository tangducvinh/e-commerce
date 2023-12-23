const mongoose = require('mongoose')

var productSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        trim: true,
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
        type: mongoose.Types.ObjectId,
        ref: 'category',
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
    variants: {
        type: Array,
    },
    version: {
        type: Array,
    },
    ratings: [
        {
            star: {type: Number},
            postedBy: {type: mongoose.Types.ObjectId, ref: 'User'},
            comment: {type: String}
        }
    ],
    totalRatings: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)
