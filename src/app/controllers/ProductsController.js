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
                    title: slug,
                    qty: 1,
                    price: parseFloat(p.price).toFixed(2)
                })
            } else {
                var cart = req.session.cart;
                var newItem = true;

                for (var i = 0; i < cart.length; i++) {
                    if (cart[i].title == slug) {
                        cart[i].qty++;
                        newItem = false;
                        break;
                    }
                }

                if (newItem) {
                    cart.push({
                        title: slug,
                        qty: 1,
                        price: parseFloat(p.price).toFixed(2)
                    })
                }
            }

            console.log(req.session.cart);
            var carts = req.session.cart;
            req.flash('success', 'Product added!')
            res.redirect('/products')
        })
    }

    showCart(req, res, next) {
        var ship = 0;
        var total = 0;
        const carts = req.session.cart
        console.log(carts);
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

}

module.exports = new ProductsController;