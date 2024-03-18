const express = require('express')
require('dotenv').config()
const dbConnect = require('./config/dbconnect')
const initRoutes = require('./routes')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()
app.use(function(req, res, next) {
    // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });

app.use(cookieParser())
const port = process.env.PORT || 7777

app.use(express.json())
app.use(express.urlencoded({extended: true}))

dbConnect()
initRoutes(app)

app.use('/', (req, res) => {res.send('server on')})

app.listen(port, () => {
    console.log('Server running on the port: '+ port)
})
