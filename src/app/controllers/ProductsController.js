const Product = require('../models/Product')
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')

class ProductsController {
    
    //GET /News
    index(req, res, next) {
        Product.find({})
            .then(products => res.render('products', { 
                products: mutipleMongooseToObject(products)
            }))
            .catch(next)       
    }

    //GET /News/:slug
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
            .then(() => res.redirect('/products'))
            .catch(erorr => {})
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
}

module.exports = new ProductsController;