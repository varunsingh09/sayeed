
const mongoose = require('mongoose');

mongoose.set('debug', true)
const Product = mongoose.model('Product', new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,

    },
    category: {
        type: Number,

    },
    email: {
        type: String,
        unique: true
    },
    is_status: {
        type: Boolean,
        default: false
    },
    created_at: { type: Date, required: true, default: Date.now }
}));

exports.Product = Product;