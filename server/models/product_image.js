const mongoose = require('mongoose');
mongoose.set('debug', true)

const ProductImage = mongoose.model('product_image', new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    product_id: {
        type: String,
    },
    original_name: {
        type: String,
        required: true
    },

    created_at: { type: Date, required: true, default: Date.now }
}));

exports.ProductImage = ProductImage;