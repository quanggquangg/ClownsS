const Product = require('../models/Product')
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')
class CheckoutController {
    
    index(req, res, next) {
        var total = 0;
        var user = req.user
        const carts = req.session.cart
        console.log(user)
        if (typeof req.session.cart !== "undefined") {
            for (var i = 0; i < carts.length; i++) {
                total = total + (carts[i].qty * carts[i].price)
            }
        }
        res.render('checkout/checkout', { user , carts , total } )
    }
}

module.exports = new CheckoutController;