const User = require('../models/User')
const Order = require('../models/Order')
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')
const { validationResult } = require('express-validator');

class UsersController {
    login(req, res, next) {
        res.render('users/login')
    }

    reg(req, res, next) {
        res.render('users/reg')
    }

    infomation(req, res, next) {
        res.render('users/information', req.user)
    }

    historyOrder(req, res, next) {
        const user = req.user
        const emailOrder = user.email
        Order.find({emailOrder})
            .then(orders => res.render('users/historyOrder', { 
                orders: mutipleMongooseToObject(orders)
            }))  
            .catch(next) 
    }

    signup (req, res, next) {
        var messages = req.flash('error');
        const result= validationResult(req.body);
        var errors=result.errors;
        if (!result.isEmpty()) {
            var messages = [];
            errors.forEach(function(error){
                messages.push(error.msg);
            });
            res.render('users/reg',{
            messages: messages,
            hasErrors: messages.length > 0,
            });
        } else {
            next();
        }
    }

    logout(req, res, next) {
        req.session.destroy();
        res.redirect('/')
    }
    
    edit(req, res, next) {
        res.render('users/edit', req.user)
    }

    update(req, res, next) {
        User.updateOne({ email: req.user.email }, req.body)
            .then(() => res.redirect('/users/information'))
            .catch(erorr => {})
    }

    order(req, res, next) {
        Order.find()
            .then(orders => res.render('users/order', { 
                orders: mutipleMongooseToObject(orders)
            }))  
            .catch(next) 
    }
}

module.exports = new UsersController;