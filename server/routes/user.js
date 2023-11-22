const router = require('express').Router()
const controllers = require('../controllers/user')
const { verifyAccessToken } = require('../middlewares/verifyToken')

router.post('/register', controllers.register)
router.post('/login', controllers.login)
router.get('/current', verifyAccessToken, controllers.getCurrent)
router.post('/refreshToken', controllers.refreshAccessToken)
router.get('/logout', controllers.logout)
router.get('/forgot-password', controllers.forgotPassword)
router.put('/reset-password/:token', controllers.checkTokenResetPassword)

module.exports = router
