const router = require('express').Router()
const { verify } = require('jsonwebtoken')
const controllers = require('../controllers/user')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/register', controllers.register)
router.get('/final-register', controllers.finalRegister)
router.post('/login', controllers.login)
router.get('/current', verifyAccessToken, controllers.getCurrent)
router.post('/refreshToken', controllers.refreshAccessToken)
router.get('/logout', controllers.logout)
router.post('/forgot-password', controllers.forgotPassword)
router.put('/update-cart', [verifyAccessToken], controllers.updateCart)
router.delete('/delete-cart', [verifyAccessToken], controllers.deleteProductCart)
router.delete('/delete-all-title-search', verifyAccessToken, controllers.removeAllTitleSearch)
router.put('/update-address',[verifyAccessToken], controllers.updateAddressUser)
router.post('/reset-password', controllers.checkTokenResetPassword)
router.get('/get-all-users', [verifyAccessToken, isAdmin], controllers.getAllUsers)
router.delete('/delete-user', [verifyAccessToken, isAdmin], controllers.deleteUser)
router.put('/update-user', verifyAccessToken, controllers.updateUser)
router.put('/update-user-by-admin/:uid', [verifyAccessToken, isAdmin], controllers.updateUserByAdmin)
router.get('/get-user', controllers.getUser)
router.get('/mock-users', controllers.mockDataUsers)
router.put('/update-quanlity-product-cart', [verifyAccessToken], controllers.updateQuanlityProductCart)
router.put('/add-wishlist', verifyAccessToken, controllers.addWishList)
router.put('/title-searched', verifyAccessToken, controllers.addTitleSearched)

module.exports = router
