const mongoose = require('mongoose');
mongoose.set('debug', true)

const ProductImage = mongoose.model('product_image', new mongoose.Schema({
  filename: {
    type: Array
  },
  product_id: {
    type: String, trim: true
  },
  u_id: {
    type: String, trim: true
  },

  created_at: { type: Date, required: true, default: Date.now }
}));

exports.ProductImage = ProductImage;