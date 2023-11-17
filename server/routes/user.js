const router = require('express').Router()
const controllers = require('../controllers/user')
const { verifyAccessToken } = require('../middlewares/verifyToken')

router.post('/register', controllers.register)
router.post('/login', controllers.login)
router.get('/current', verifyAccessToken, controllers.getCurrent)

module.exports = router
