const Product = require('../models/Product')
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')
const Voucher = require('../models/Voucher')
class CheckoutController {
    
    index(req, res, next) {
        var total = 0;
        var user = req.user
        const carts = req.session.cart        
        var valueVoucher = 0
        var voucherCode = req.query.voucherCode
        if (typeof req.session.cart !== "undefined") {
            for (var i = 0; i < carts.length; i++) {
                total = total + (carts[i].qty * carts[i].price)
            }
        }
        if (typeof user !== "undefined") {
            if (voucherCode != null) {
                Voucher.findOne({code: voucherCode}, function(err, voucher) {
                    if (voucher != null) {
                        valueVoucher = voucher.value
                    }
                    res.render('checkout/checkout', { user , carts , total , valueVoucher } )
                })
            }  else {
                res.render('checkout/checkout', { user , carts , total , valueVoucher } )
            }            
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