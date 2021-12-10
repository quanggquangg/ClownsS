const express = require('express')
const router = express.Router()
const checkoutController = require('../app/controllers/CheckoutController')

router.get('/', checkoutController.index )
router.get('/finish', checkoutController.finish )

module.exports = router;