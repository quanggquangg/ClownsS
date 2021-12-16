const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug)

const ListProduct = new Schema({ 
    nameProduct: String,
    priceProduct: String,
    qtyProduct: Number,
    imgProduct: String,
    idProduct: String,
 });
const Order = new Schema({
    usernameOrder: { type: String },
    total: { type: String },
    emailOrder: { type: String },
    phonenumberOrder: { type: String },
    addressOrder: { type: String },
    voucher: { type: String },
    listProducts: [ListProduct],
    status: String,
    statusPaid: String
   }, {
       timestamps: true,
   })

module.exports = mongoose.model('Order', Order)
