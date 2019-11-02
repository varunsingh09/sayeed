const mongoose = require('mongoose');
mongoose.set('debug', true)



const KitchenRegSchema = mongoose.model('DevelopmentSignup2', new mongoose.Schema({


  KitchenName: { type: String, maxlength: 25, required: true ,trim: true},
  Address: { type: String, maxlength: 25, required: true ,trim: true},
  State: { type: String, maxlength: 25, required: true ,trim: true},
  City: { type: String, maxlength: 25, required: true,trim: true },
  Zipcode: { type: Number, maxlength: 6, required: true, trim: true},
  Email: { type: String, maxlength: 30, required: true, unique: true ,trim: true},
  Password: { type: String, maxlength: 20, required: true,trim: true },
  confirm_password: { type: String, maxlength: 20, required: true,trim: true },
  Phone: { type: Number, maxlength: 10, required: true ,trim: true},
  created_at: { type: Date, required: true, default: Date.now }




}, {
  writeConcern: {
    w: 'majority',
    j: true,
    wtimeout: 1000
  }
  }));

exports.KitchenRegSchema = KitchenRegSchema;