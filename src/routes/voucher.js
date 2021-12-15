const express = require('express')
const router = express.Router()
const voucherController = require('../app/controllers/VoucherController')

router.post('/:id/edit', voucherController.update )

router.get('/:id/edit', voucherController.edit )

router.get('/:id/delete', voucherController.delete )

router.get('/listvouchers', voucherController.list )

router.get('/create', voucherController.create )

router.post('/store', voucherController.store )

module.exports = router;