const User = require('../models/User')
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
}

module.exports = new UsersController;