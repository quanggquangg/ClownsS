const productsRouter = require('./products')
const usersRouter = require('./users')
const homeRouter = require('./home')
const checkoutRouter = require('./checkout')
const orderRouter = require('./order')
const express = require('express')
const app = express()

function route(app) {  
    app.use('/', homeRouter)

    app.use('/products', productsRouter)
    
    app.use('/users', usersRouter)

    app.use('/checkout', checkoutRouter)

    app.use('/order', orderRouter)

}

module.exports = route;