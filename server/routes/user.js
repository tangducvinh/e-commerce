const router = require('express').Router()
const controllers = require('../controllers/user')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/register', controllers.register)
router.post('/login', controllers.login)
router.get('/current', verifyAccessToken, controllers.getCurrent)
router.post('/refreshToken', controllers.refreshAccessToken)
router.get('/logout', controllers.logout)
router.get('/forgot-password', controllers.forgotPassword)
router.put('/reset-password/:token', controllers.checkTokenResetPassword)
router.get('/get-all-users', [verifyAccessToken, isAdmin], controllers.getAllUsers)
router.delete('/delete-user', [verifyAccessToken, isAdmin], controllers.deleteUser)
router.put('/update-user', verifyAccessToken, controllers.updateUser)
router.put('/update-user-by-admin/:uid', [verifyAccessToken, isAdmin], controllers.updateUserByAdmin)

module.exports = router
