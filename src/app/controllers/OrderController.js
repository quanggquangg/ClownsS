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
                    idProduct: carts[i].id,
                    imgProduct: carts[i].img,
                    nameProduct: carts[i].title,
                    priceProduct: carts[i].price,
                    qtyProduct: carts[i].qty
                })
            }
        }
        order.status = "Chưa xác nhận"
        order.statusPaid = "Chưa thanh toán"
        order.voucher = req.body.voucher
        order.save()
            .then(() => res.redirect('/checkout/finish'))
            .catch(next)
        req.session.cart = undefined
    }

    showOrder(req, res, next) {
        Order.findById(req.params.slug)
        .then(order => res.render('orders/showOrder', {
            order: mongooseToObject(order)
        }))
        .catch(next)
    }

    editOrder(req, res, next) {
        Order.findById(req.params.slug)
        .then(order => res.render('orders/editOrder', {
            order: mongooseToObject(order)
        }))
        .catch(next)
    }

    saveOrder(req, res, next) {
        Order.updateOne({ _id: req.params.slug }, req.body)
            .then(() => res.redirect('/users/order'))
            .catch(erorr => {})
    }

}

module.exports = new OrderController;