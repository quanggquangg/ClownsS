const express = require('express')
const router = express.Router()
const productsController = require('../app/controllers/ProductsController')

router.post('/:id/edit', productsController.update )

router.get('/:id/edit', productsController.edit )

router.get('/:id/delete', productsController.delete )

router.get('/listproducts', productsController.list )

router.get('/create', productsController.create )

router.post('/store', productsController.store )

router.get('/cart', productsController.showCart )
router.post('/cart', productsController.deleteCart )

router.get('/speaker', productsController.showSpeaker )
router.get('/camera', productsController.showCamera )
router.get('/laptop', productsController.showLaptop )
router.get('/screen', productsController.showScreen )
router.get('/ram', productsController.showRam )
router.get('/mouse', productsController.showMouse )
router.get('/keyboard', productsController.showKeyboard )
router.get('/headphone', productsController.showHeadphone )
router.get('/disk', productsController.showDisk )
router.get('/graphics-card', productsController.showGraphicscard )
router.get('/phone-acc', productsController.showPhoneacc )

router.get('/:slug', productsController.show )

router.post('/:slug', productsController.addToCart )

router.get('/', productsController.index )

module.exports = router;