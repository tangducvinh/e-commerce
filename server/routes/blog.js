const router = require('express').Router()
const controllers = require('../controllers/blog')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/', [verifyAccessToken, isAdmin], controllers.createBlog)
router.get('/', controllers.getBlogs)
router.get('/like', [verifyAccessToken], controllers.likeBlog)
router.get('/dislike', [verifyAccessToken], controllers.dislikeBlog)
router.put('/:bid', [verifyAccessToken, isAdmin], controllers.updateBlog)

module.exports = router