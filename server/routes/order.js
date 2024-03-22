const router = require('express').Router()
const controllers = require('../controllers/order')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/', [verifyAccessToken], controllers.createOrder)
router.get('/', verifyAccessToken, controllers.getUserOder)
router.get('/get-orders', [ verifyAccessToken, isAdmin ], controllers.getOrders)

module.exports = router

