const router = require('express').Router()
const controllers = require('../controllers/insertData')

router.post('', controllers.insertDataProduct)

module.exports = router