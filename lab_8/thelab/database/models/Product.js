const {Schema, model} = require('mongoose');

const productPrice = new Schema({
  name: {type: String, required: true},
  price: {type: Number, required: true},
}, { versionKey: false });

module.exports = model('product', productPrice);
