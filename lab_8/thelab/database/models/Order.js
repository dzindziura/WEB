const {Schema, model} = require('mongoose');

const orderItem = new Schema({
  productId: {type: Schema.Types.ObjectId, ref: 'product', required: true},
  count: {type: Number, required: true}
});

const orderScheme = new Schema({
  cartItems: {type: [orderItem], _id: false}
},{ versionKey: false });

module.exports = model('order', orderScheme);
