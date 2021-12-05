const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug)

const Product = new Schema({
    name: { type: String },
    description: { type: String },
    price: { type: String },
    category: { type: String },
    img: { type: String, maxLength: 255 },
    code: { type: String, unique: true },
    brand: { type: String },
    slug: { type: String, slug: 'name', unique: true }
   }, {
       timestamps: true,
   })

module.exports = mongoose.model('Product', Product)