const router = require('express').Router()
const controllers = require('../controllers/product')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/create', [verifyAccessToken, isAdmin], controllers.createProduct)
router.get('/infor-product', controllers.getProduct)
router.get('/infor-all-product', controllers.getAllProduct)
router.put('/update/:pid', [verifyAccessToken, isAdmin], controllers.updateProduct)
router.delete('/:pid', [verifyAccessToken, isAdmin], controllers.deleteProduct)

module.exports = router