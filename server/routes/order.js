const router = require('express').Router()
const controllers = require('../controllers/order')
const { verifyAccessToken } = require('../middlewares/verifyToken')

router.post('/', [verifyAccessToken], controllers.createOrder)

module.exports = router

