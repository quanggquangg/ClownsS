const Product = require('../models/Product')
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')
class HomeController {
    
    //GET /News
    index(req, res, next) {
        Product.find({})
            .then(products => res.render('home', { 
                products: mutipleMongooseToObject(products)
            }))  
            .catch(next) 
    }
}

module.exports = new HomeController;