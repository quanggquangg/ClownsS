const Product = require('../models/Product')
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')
class CheckoutController {
    
    index(req, res, next) {
        var total = 0;
        var user = req.user
        const carts = req.session.cart
        if (typeof req.session.cart !== "undefined") {
            for (var i = 0; i < carts.length; i++) {
                total = total + (carts[i].qty * carts[i].price)
            }
        }
        if (typeof user !== "undefined") {
        res.render('checkout/checkout', { user , carts , total } )
        } else {
            res.redirect('/users/login')
        }
    }

    finish(req, res, next) {
        var total = 0;
        if (typeof req.session.cart !== "undefined") {
            for (var i = 0; i < carts.length; i++) {
                total = total + (carts[i].qty * carts[i].price)
            }
        }
        res.render('checkout/finish', total)
    }
}

module.exports = new CheckoutController;