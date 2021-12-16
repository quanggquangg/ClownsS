const express = require('express')
const router = express.Router()
const productsController = require('../app/controllers/ProductsController')
const checkoutController = require('../app/controllers/CheckoutController')
const { deleteOneCart } = require('../app/controllers/ProductsController')
const { addOneCart } = require('../app/controllers/ProductsController')

router.post('/:id/edit', productsController.update )

router.get('/:id/edit', productsController.edit )

router.get('/:id/delete', productsController.delete )

router.get('/listproducts', productsController.list )

router.get('/create', productsController.create )

router.post('/store', productsController.store )

router.get('/cart/add', addOneCart )
router.get('/cart/del', deleteOneCart )
router.get('/cart', productsController.showCart )
router.post('/cart', productsController.deleteCart )

router.get('/camera', productsController.showCamera )
router.get('/laptop', productsController.showLaptop )
router.get('/screen', productsController.showScreen )
router.get('/phone', productsController.showPhone )

router.get('/:slug', productsController.show )

router.post('/:slug', productsController.addToCart )

router.get('/', productsController.index )

module.exports = router;