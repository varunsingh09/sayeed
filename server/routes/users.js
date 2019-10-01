const { User } = require('./../models/user');
const { ProfileImage } = require('./../models/image');
const express = require('express');
var nodemailer = require('nodemailer');
var fs = require('fs');


var config = require("./../config")
const jwt = require('jsonwebtoken')


const router = express.Router();
const { validationResult } = require('express-validator/check');
const { upload, verifyToken } = require('./../middleware/middleware')


router.post("/update", async function (req, res) {
  user = {
    name: req.body.name,
    email: req.body.email,
    full_name: req.body.full_name,
    last_name: req.body.last_name,
    mobile: req.body.mobile,
    password: req.body.password,
    confirm_password: req.body.confirm_password,
    zipcode: req.body.zipcode,
    state: req.body.state,
    city: req.body.city,
    country: req.body.country,
  };
  console.log('come post route', req.headers.id)
  await User.updateOne({ _id: req.headers.id }, { '$set': user })

  res.status(200).send('updated')

});


router.get('/profile', async function (req, res) {

  let user = await User.find().sort("-_id");
  return res.status(422).send({ user: user });

});



router.post('/register',verifyToken, upload.single('myFile'), async (req, res, next) => {

  // Check if this user already exisits
  let user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.status(400).json({ errors: 'That user already exisits! Change email id' });
  } else {

    try {

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array({ onlyFirstError: true }) });
      }
      // Insert the new user if they do not exist yet
      user = new User({
        name: req.body.name,
        email: req.body.email,
        full_name: req.body.full_name,
        last_name: req.body.last_name,
        mobile: req.body.mobile,
        password: req.body.password,
        confirm_password: req.body.confirm_password,
        zipcode: req.body.zipcode,
        state: req.body.state,
        city: req.body.city,
        country: req.body.country,
        email: req.body.email,
      });
      await user.save();

      let userId = user._id
      const file = req.file


      //rename  and upload image
      fs.rename(file.path, file.path, async function (err) {
        if (err) {
          console.log(err);
          res.send(500);
        } else {

          res.send({
            message: 'File uploaded successfully',
            filename: req.file.filename
          });

          profileimage = new ProfileImage({
            filename: req.file.filename,
            user_id: userId,
            original_name: req.file.originalname,
          });

          await profileimage.save();
        }
      });


      //sending email
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'dineout2018@gmail.com',
          pass: 'dineout@2018'
        }
      });

      var mailOptions = {
        from: 'dineout2018@gmail.com',
        to: 'singh.varun1985@gmail.com,varun.singh@homeshop18.com',
        subject: 'Sending Email using Node.js test mail',
        text: 'That was easy!'
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

    } catch (err) {
      return next(err)
    }

  }
});


router.post('/login', async (req, res, next) => {

  // Check if this user already exisits
  let user = await User.findOne({ email: req.body.email, password: req.body.password });
  let userId = user._id

  try {


    var token = jwt.sign({ id: userId }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token, user });

  } catch (err) {
    return next(err)
  }

});


module.exports = router;
