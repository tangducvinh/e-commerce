const router = require('express').Router()
const controllers = require('../controllers/blog')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/', [verifyAccessToken, isAdmin], controllers.createBlog)
router.get('/', controllers.getBlogs)
router.get('/get-blog/:bid', controllers.getBlog)
router.get('/like/:bid', [verifyAccessToken], controllers.likeBlog)
router.get('/dislike/:bid', [verifyAccessToken], controllers.dislikeBlog)
router.put('/:bid', [verifyAccessToken, isAdmin], controllers.updateBlog)
router.delete('/:bid', [verifyAccessToken, isAdmin], controllers.deleteBlog)

module.exports = router