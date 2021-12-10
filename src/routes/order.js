const express = require('express')
const router = express.Router()
const orderController = require('../app/controllers/OrderController')

router.post('/store', orderController.store )
router.get('/:slug', orderController.showOrder )

module.exports = router;