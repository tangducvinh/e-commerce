const router = require('express').Router()

const controllers = require('../controllers/home')

router.get('', controllers.getHome)
router.post('/', controllers.addBanner)
router.put('/:hid', controllers.pushBanner)
router.put('/advantise/:hid', controllers.pushAdvantise)

module.exports = router