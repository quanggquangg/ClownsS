const Product = require('../models/Product')
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')
class HomeController {
    
    //GET /News
    index(req, res, next) {
        res.render('home')
    }

    about(req, res, next) {
        res.render('about')
    }
}

module.exports = new HomeController;