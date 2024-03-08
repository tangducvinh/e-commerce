const router = require('express').Router()
const controllers = require('../controllers/order')
const { verifyAccessToken } = require('../middlewares/verifyToken')

router.post('/', [verifyAccessToken], controllers.createOrder)
router.get('/', verifyAccessToken, controllers.getUserOder)

module.exports = router

