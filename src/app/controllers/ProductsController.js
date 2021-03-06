const Product = require('../models/Product')
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')

class ProductsController {
    
    index(req, res, next) {
        Product.find({})
            .then(products => res.render('products/products', { 
                products: mutipleMongooseToObject(products)
            }))  
            .catch(next) 
    }

    show(req, res, next) {
        Product.findOne({ slug: req.params.slug })
            .then(product => res.render('products/show', {
                product: mongooseToObject(product)
            }))
            .catch(next)
    }

    create(req, res, next) {
        res.render('products/create')
    }

    store(req, res, next) {
        req.body
        const product = new Product(req.body)
        product.save()
            .then(() => res.redirect('/products/listproducts'))
            .catch(next)
    }

    list(req, res, next) {
        Product.find({})
            .then(products => res.render('products/listproducts', { 
                products: mutipleMongooseToObject(products)
            }))
            .catch(next)  
    }

    edit(req, res, next) {
        Product.findOne({ _id: req.params.id })
            .then(product => res.render('products/edit', { 
                product: mongooseToObject(product)
            }))
            .catch(next)
    }

    update(req, res, next) {
        Product.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/products/listproducts'))
            .catch(erorr => {})
    }

    delete(req, res, next) {
        Product.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('/products/listproducts'))
            .catch(erorr => {})
    }

    addToCart(req, res, next) {
        var slug = req.params.slug;
        Product.findOne({ slug: slug }, function (err, p) {
            if (err)
                console.log(err);

            if (typeof req.session.cart == "undefined") {
                req.session.cart = [];
                req.session.cart.push({
                    id: p.slug,
                    img: p.img,
                    title: p.name,
                    qty: 1,
                    price: (parseFloat(p.price).toFixed(2) * 1000000)
                })
            } else {
                var cart = req.session.cart;
                var newItem = true;

                for (var i = 0; i < cart.length; i++) {
                    if (cart[i].title == p.name) {
                        cart[i].qty++;
                        newItem = false;
                        break;
                    }
                }

                if (newItem) {
                    cart.push({
                        id: p.slug,
                        img: p.img,
                        title: p.name,
                        qty: 1,
                        price: (parseFloat(p.price).toFixed(2) * 1000000)
                    })
                }
            }
            var carts = req.session.cart;
            req.flash('success', 'Product added!')
            res.redirect('/products')
        })
    }

    deleteCart(req, res, next) {
        req.session.cart = undefined
        res.redirect("/products/cart")
    }

    deleteOneCart(req, res, next) {
        var id = req.query.id
        var carts = req.session.cart
        if (typeof carts !== "undefined") {
            for (var i = 0; i < carts.length; i++) {
                if (carts[i].id == id) {
                    carts.splice(i, 1)
                }
            }
        }
        res.redirect("/products/cart")
    }

    addOneCart(req, res, next) {
        var id = req.query.id
        var qty = req.query.qty
        var carts = req.session.cart
        if (typeof carts !== "undefined") {
            for (var i = 0; i < carts.length; i++) {
                if (carts[i].id == id) {
                    carts[i].qty = qty
                }
            }
        }
        res.redirect("/products/cart")
    }

    showCart(req, res, next) {
        var ship = 0;
        var total = 0;
        const carts = req.session.cart
        if (typeof req.session.cart !== "undefined") {
            for (var i = 0; i < carts.length; i++) {
                total = total + (carts[i].qty * carts[i].price)
            }
        }
        res.render('products/cart', { carts, total, ship } )
    }

    showLaptop(req, res, next) {
        Product.find({})
            .then(products => res.render('products/laptop', { 
                products: mutipleMongooseToObject(products)
            }))  
            .catch(next) 
    }

    showScreen(req, res, next) {
        Product.find({})
            .then(products => res.render('products/screen', { 
                products: mutipleMongooseToObject(products)
            }))  
            .catch(next) 
    }   

    showCamera(req, res, next) {
        Product.find({})
            .then(products => res.render('products/camera', { 
                products: mutipleMongooseToObject(products)
            }))  
            .catch(next) 
    }

    showPhone(req, res, next) {
        Product.find({})
            .then(products => res.render('products/phone', { 
                products: mutipleMongooseToObject(products)
            }))  
            .catch(next) 
    }

}

module.exports = new ProductsController;