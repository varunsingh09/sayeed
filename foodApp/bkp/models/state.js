
const mongoose = require('mongoose');
mongoose.set('debug', true)
const State = mongoose.model('state', new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    parent_id: {
        type: String,
        default:0
    },
    zipcode: {
        type: String,
    },
    status: {
        type: Number,
        default:true
    },

    created_at: { type: Date, required: true, default: Date.now }
}));


exports.State = State;