const express = require('express')
const router = express.Router()
const usersController = require('../app/controllers/UsersController')
const { check, validationResult } = require('express-validator');
const  passport = require('passport')

router.get('/login', usersController.login )

router.get('/reg', usersController.reg )

router.post('/reg', 
[
  check('email', 'Your email is not valid').isEmail(),
  check('password', 'Your password must be at least 5 characters').isLength({ min: 5 })
  ], usersController.signup,
  passport.authenticate('local.signup', { successRedirect: '/users/login', successMessage: 'Đăng ký thành công',
                                  failureRedirect: '/users/reg', failureMessage: 'Đăng ký thất bại',
                                  failureFlash: true })
);

router.post('/login', passport.authenticate("local.signin", {
    successRedirect : '/', // Khi bạn điền đúng thông tin đăng nhập thì nó sẽ chuyển hướng bạn đến trang chủ
    failureRedirect : '/users/login', // trở lại trang đăng nhập nếu có lỗi
    failureFlash : true,
    successFlash: 'Welcome!'
    }));

router.get('/logout', usersController.logout )

router.get('/information', usersController.infomation )
module.exports = router;