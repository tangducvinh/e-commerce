const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    numberViews:{
        type:String,
        default: 0,
    },
    isLike: {
        type: Boolean,
        default: false,
    },
    isDislike: {
        type: Boolean,
        default: false,
    },
    likes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'user',
        }
    ],
    dislikes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'user',
        }
    ],
    image: {
        type: String,
        default: 'https://wallpaperaccess.com/full/2433830.jpg'
    },
    author: {
        type: String,
        default: 'Admin'
    }

}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

//Export the model
module.exports = mongoose.model('Blog', blogSchema);