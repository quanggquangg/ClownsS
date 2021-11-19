const productsRouter = require('./products')
const express = require('express')
const app = express()

function route(app) {  
    app.use('/products', productsRouter)
}

module.exports = route;