const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug)

const Voucher = new Schema({
    code: { type: String },
    value: { type: String }
   }, {
       timestamps: true,
   })

module.exports = mongoose.model('Voucher', Voucher)