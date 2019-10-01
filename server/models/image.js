const mongoose = require('mongoose');
mongoose.set('debug', true)

const ProfileImage = mongoose.model('ProfileImage', new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
    },
    original_name: {
        type: String,
        required: true
    },

    created_at: { type: Date, required: true, default: Date.now }
}));

exports.ProfileImage = ProfileImage;