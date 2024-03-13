const mongoose = require('mongoose') // Erase if already required
const bcrypt = require('bcrypt')
const crypto = require('crypto')

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        require,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    mobile:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: [7, 3],
        default: 3,
    },
    searcheds: {
        type: Array,
    },
    cart: [{
        product: {type: mongoose.Types.ObjectId, ref: 'Product'},
        quanlity: {type: Number},
        color: {type: String},
    }],
    addressDefault: {type: Object},
    address:[
        {
            city: {type: String},
            county: {type: String},
            ward: {type: String},
            street: {type: String},
        }
    ],
    wishlist: [{type: mongoose.Types.ObjectId, ref: 'Product'}],
    status: {
        type: Boolean,
        default: false,
    },
    refreshToken: {
        type: String,
    },
    passwordChangedAt: {
        type: String
    },
    passwordResetToken: {
        type: String,
    },
    passwordResetExpire: {
        type: String,
    }
}, {
    timestamps: true,
});

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = bcrypt.genSaltSync(10)
        this.password = await bcrypt.hash(this.password, salt)
    }
})

userSchema.methods = {
    isCorrectPassword: async function(password) {
        return await bcrypt.compare(password, this.password)
    },
    createPasswordChangedToken: function() {
        const resetToken = crypto.randomBytes(32).toString('hex')
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
        this.passwordResetExpire = Date.now() + 15 * 60 * 1000
        return resetToken
    }
}

//Export the model
module.exports = mongoose.model('User', userSchema);