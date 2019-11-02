
const mongoose = require('mongoose');

mongoose.set('debug', true)

const Order = mongoose.model('Order', new mongoose.Schema({
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
    product_id: {
        type: Number,

    },
    admin_id: {
        type: Number,

    },
    category: {
        type: Number,

    },
    is_status: {
        type: Boolean,
        default: false
    },
    created_at: { type: Date, required: true, default: Date.now },
}));

exports.Order = Order;