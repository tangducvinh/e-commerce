const router = require('express').Router()
const controllers = require('../controllers/blog')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const uploadCloud = require('../config/cloudinary.config')

router.post('/', [verifyAccessToken, isAdmin], controllers.createBlog)
router.get('/', controllers.getBlogs)
router.get('/get-blog/:bid', controllers.getBlog)
router.get('/like/:bid', [verifyAccessToken], controllers.likeBlog)
router.get('/dislike/:bid', [verifyAccessToken], controllers.dislikeBlog)
router.put('/upload-image/:bid', [verifyAccessToken, isAdmin], uploadCloud.single('image'), controllers.uploadImageBlog)
router.put('/:bid', [verifyAccessToken, isAdmin], controllers.updateBlog)
router.delete('/:bid', [verifyAccessToken, isAdmin], controllers.deleteBlog)

module.exports = router