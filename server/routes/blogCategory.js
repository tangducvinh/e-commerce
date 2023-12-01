const router = require('express').Router()
const controllers = require('../controllers/blogCategory')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/', [verifyAccessToken, isAdmin], controllers.createBlog)
router.get('/', controllers.getBlogs)
router.put('/:bid', controllers.updateBlog)
router.delete('/:bid', controllers.deleteBlog)

module.exports = router
