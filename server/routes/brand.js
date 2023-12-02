const router = require('express').Router()
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const controllers = require('../controllers/brand')

router.post('/', [verifyAccessToken, isAdmin], controllers.createBrand)
router.get('/', controllers.getBrands)
router.put('/:bid', [verifyAccessToken, isAdmin], controllers.updateBrand)
router.delete('/:bid', [verifyAccessToken, isAdmin], controllers.deleteBand)

module.exports = router