
const mongoose = require('mongoose');
mongoose.set('debug', true)
const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    full_name: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 50
    },
    last_name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    mobile: {
        type: Number,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    zipcode: {
        type: Number,
        required: true,
        minlength: 5,
        maxlength: 6
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    confirm_password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    is_admin: {
        type: Boolean,
        default: false
    },
    created_at: { type: Date, required: true, default: Date.now }
}));

exports.User = User;