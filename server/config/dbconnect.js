// interaction with database mongodb
const { default: mongoose } = require('mongoose')

// connect with database mongodb
async function dbConnect() {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        if (conn.connection.readyState === 1) console.log('DB connection is successfully')
        else console.log('DB connecting')
    } catch (error) {
        console.log('DB connection is failed')
        // throw new Error(error)
    }
}

module.exports = dbConnect

