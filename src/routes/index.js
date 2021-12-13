const productsRouter = require('./products')
const usersRouter = require('./users')
const homeRouter = require('./home')
const checkoutRouter = require('./checkout')
const orderRouter = require('./order')
const express = require('express')
const app = express()
const { countCart } = require('../middleware')

function route(app) {  
    app.use('/', countCart, homeRouter)

    app.use('/products', productsRouter)
    
    app.use('/users', usersRouter)

    app.use('/checkout', checkoutRouter)

    app.use('/order', orderRouter)
}

module.exports = route;