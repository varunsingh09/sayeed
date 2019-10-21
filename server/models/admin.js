
const mongoose = require('mongoose');
mongoose.set('debug', true)
const Admin = mongoose.model('admin_registration', new mongoose.Schema({
    name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,

    },
    confirm_password: {
    },

    created_at: { type: Date, required: true, default: Date.now }
}));

exports.Admin = Admin;