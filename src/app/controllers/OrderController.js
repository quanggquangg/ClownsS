const Product = require('../models/Product')
const Order = require('../models/Order')
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')

class OrderController {
    store(req, res, next) {
        const order = new Order(req.body)
        const carts = req.session.cart
        if (typeof carts !== "undefined") {
            for (var i = 0; i < carts.length; i++) {
                order.listProducts.push({
                    nameProduct: carts[i].title,
                    priceProduct: carts[i].price,
                    qtyProduct: carts[i].qty
                })
            }
        }
        order.status = "Đang xử lý"
        order.save()
            .then(() => res.redirect('/checkout/finish'))
            .catch(next)
    }

    showOrder(req, res, next) {
        Order.findById(req.params.slug)
        .then(order => res.render('orders/showOrder', {
            order: mongooseToObject(order)
        }))
        .catch(next)
    }

}

module.exports = new OrderController;