const productsRouter = require('./products')
const usersRouter = require('./users')
const homeRouter = require('./home')
const checkoutRouter = require('./checkout')
const orderRouter = require('./order')
const voucherRouter = require('./voucher')
const express = require('express')
const app = express()
const nodemailer =  require('nodemailer');
const { countCart } = require('../middleware')
const { loginAuth } = require('../middleware')

function route(app) {  
    app.use('/', countCart, loginAuth, homeRouter)

    app.use('/products', productsRouter)
    
    app.use('/users', usersRouter)

    app.use('/checkout', checkoutRouter)

    app.use('/order', orderRouter)

    app.use('/voucher', voucherRouter)

    app.post('/send-mail', function(req, res) {
        //Tiến hành gửi mail, nếu có gì đó bạn có thể xử lý trước khi gửi mail
        var transporter =  nodemailer.createTransport({ // config mail server
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'clownsstore144@gmail.com', //Tài khoản gmail vừa tạo
                pass: 'clowns1234' //Mật khẩu tài khoản gmail vừa tạo
            },
            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false
            }
        });
        var content = '';
        content += `
        <!DOCTYPE html>
        <html>
        <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
        body {
          font-family: Arial;
        }
        
        .coupon {
          border: 5px dotted #bbb;
          width: 80%;
          border-radius: 15px;
          margin: 0 auto;
          max-width: 600px;
        }
        
        .container {
          padding: 2px 16px;
          background-color: #f1f1f1;
        }
        
        .promo {
          background: #ccc;
          padding: 3px;
        }
        
        .expire {
          color: red;
        }
        </style>
        </head>
        <body>
        
        <div class="coupon">
          <div class="container" style="text-align: center">
            <h3>Clowns Store</h3>
          </div>
          <img src="https://kenh14cdn.com/k:thumb_w/600/A3YmnWqkHeph7OwGyu6TwbX57tgTw/Image/2013/09/funny_scary_clown-normal-cb8b8/noi-so-chu-he-va-nhung-cau-chuyen-am-anh.jpg" alt="Avatar" style="width:100%;">
          <div class="container" style="background-color:white">
            <h2><b>GIẢM 100K CHO ĐƠN HÀNG ĐẦU TIÊN</b></h2> 
            <p>Clowns Store xin gửi đến quý khách voucher giảm 100k cho đơn hàng đầu tiên. Xin cảm ơn quý khách đã đăng ký, mong quý khách sẽ hài lòng khi đến với cửa hàng. Niềm vui của bạn là hạnh phúc của chúng tôi.</p>
          </div>
          <div class="container">
            <p>Mã code voucher: <span class="promo">BOH232</span></p>
          </div>
        </div>
        
        </body>
        </html> 
        
        `;
        var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
            from: "Clowns Store",
            to: req.body.mail,
            subject: "Thư cảm ơn",
            text: "clownsstore144@gmail.com",//Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
            html: content //Nội dung html mình đã tạo trên kia :))
        }
        transporter.sendMail(mainOptions, function(err, info){
            if (err) {
                console.log(err);
                req.flash('mess', 'Lỗi gửi mail: '+err); //Gửi thông báo đến người dùng
                res.redirect('/');
            } else {
                console.log('Message sent: ' +  info.response);
                req.flash('mess', 'Một email đã được gửi đến tài khoản của bạn'); //Gửi thông báo đến người dùng
                res.redirect('/');
            }
        });
    });
}

module.exports = route;