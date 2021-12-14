const express = require('express')
const router = express.Router()
const orderController = require('../app/controllers/OrderController')

router.post('/store', orderController.store )
router.get('/:slug', orderController.showOrder )
router.get('/edit/:slug', orderController.editOrder )
router.post('/edit/:slug', orderController.saveOrder )

module.exports = router;