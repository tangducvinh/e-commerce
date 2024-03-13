const router = require('express').Router()
const controllers = require('../controllers/product')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const uploadCloud = require('../config/cloudinary.config')

router.post('/create', [verifyAccessToken, isAdmin], controllers.createProduct)
router.get('/infor-product', controllers.getProduct)
router.get('/infor-all-product', controllers.getAllProduct)
router.get('/search', controllers.getProductSearch)
router.put('/ratings', verifyAccessToken, controllers.ratings)
router.put('/update/:pid', [verifyAccessToken, isAdmin], controllers.updateProduct)
router.put('/upload-image/:pid', [verifyAccessToken, isAdmin], uploadCloud.array('image', 10), controllers.uploadImageProduct)
router.delete('/:pid', [verifyAccessToken, isAdmin], controllers.deleteProduct)

module.exports = router