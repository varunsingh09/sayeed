
const mongoose = require('mongoose');
mongoose.set('debug', true)
const Admin = mongoose.model('master_admin', new mongoose.Schema({
    full_name: {
        type: String,
        required: true,
        unique:true
    },
    company_name: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zipcode: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique:true,
        required: true,
    },
    password: {
        type: String,
        required: true,

    },
    agreement_policy: {
        type: String,
        required: false,
    },
    status: {
        type: Number,
        default:true
    },

    created_at: { type: Date, required: true, default: Date.now }
}));

exports.Admin = Admin;