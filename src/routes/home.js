const express = require('express')
const router = express.Router()
const homeController = require('../app/controllers/HomeController')

router.get('/', homeController.index )
router.get('/about', homeController.about )

module.exports = router;