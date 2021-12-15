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
                    id: p._id,
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
                        id: p._id,
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

    showSpeaker(req, res, next) {
        Product.find({})
            .then(products => res.render('products/speaker', { 
                products: mutipleMongooseToObject(products)
            }))  
            .catch(next) 
    }
    showRam(req, res, next) {
        Product.find({})
            .then(products => res.render('products/ram', { 
                products: mutipleMongooseToObject(products)
            }))  
            .catch(next) 
    }
    showMouse(req, res, next) {
        Product.find({})
            .then(products => res.render('products/mouse', { 
                products: mutipleMongooseToObject(products)
            }))  
            .catch(next) 
    }
    showKeyboard(req, res, next) {
        Product.find({})
            .then(products => res.render('products/keyboard', { 
                products: mutipleMongooseToObject(products)
            }))  
            .catch(next) 
    }
    showHeadphone(req, res, next) {
        Product.find({})
            .then(products => res.render('products/headphone', { 
                products: mutipleMongooseToObject(products)
            }))  
            .catch(next) 
    }
    showDisk(req, res, next) {
        Product.find({})
            .then(products => res.render('products/disk', { 
                products: mutipleMongooseToObject(products)
            }))  
            .catch(next) 
    }
    showGraphicscard(req, res, next) {
        Product.find({})
            .then(products => res.render('products/graphics-card', { 
                products: mutipleMongooseToObject(products)
            }))  
            .catch(next) 
    }
    showPhoneacc(req, res, next) {
        Product.find({})
            .then(products => res.render('products/phone-acc', { 
                products: mutipleMongooseToObject(products)
            }))  
            .catch(next) 
    }
    search(req, res, next){
        var name = req.query.name;
        Product.find({ name: new RegExp(name, "i")})
        .then(products => res.render('products/products', { 
            products: mutipleMongooseToObject(products)
        })) 
    }
}

module.exports = new ProductsController;