const mongoose = require('mongoose')

var homeSchema = new mongoose.Schema({
    banner: [
        {
            link: {type: String},
            name: {type: String},
            description: {type: String}
        }
    ],
    advantise: {
        type: Array,
    }
    
}, {
    timestamps: true,
})


module.exports = mongoose.model('Home', homeSchema)