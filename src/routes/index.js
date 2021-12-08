const productsRouter = require('./products')
const usersRouter = require('./users')
const homeRouter = require('./home')
const checkoutRouter = require('./checkout')
const express = require('express')
const app = express()

function route(app) {  
    app.use('/', homeRouter)

    app.use('/products', productsRouter)
    
    app.use('/users', usersRouter)

    app.use('/checkout', checkoutRouter)
}

module.exports = route;