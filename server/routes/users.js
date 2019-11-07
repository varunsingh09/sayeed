const { User } = require('./../models/user');
const { ProfileImage } = require('./../models/image');
const express = require('express');
var nodemailer = require('nodemailer');
var fs = require('fs');

const router = express.Router();
const { validationResult, check } = require('express-validator');
const { validateMeChecks, upload, jwtVerifyToken, jwtSignin } = require('./../middleware/middleware')


const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyAIu_O7c-TQR2jvMxmIHRWm49Kugk7xX1E',
  Promise: Promise
});


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
  console.log("user session information===", req.session.email)
  let user = await User.find().sort("-_id");
  return res.status(200).send({ user: user });

});



router.post('/register', jwtVerifyToken, async (req, res, next) => {

console.log('come')
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(200).json({ errors: errors.array({ onlyFirstError: true }) });
  }


  let user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.status(400).json({ errors: 'That user already exisits! Change email id' });
  } else {

    try {

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
        to: 'singh.varun1985@gmail.com,dineout2018@gmail.com',
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

router.post('/register2',  async (req, res, next) => {

  
    let user = await User.findOne({ email: req.body.email });
  
    if (user) {
      return res.status(400).json({ errors: 'That user already exisits! Change email id' });
    } else {
  
      try {
  
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
          to: 'singh.varun1985@gmail.com,dineout2018@gmail.com',
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

  if (!user) {
    return res.status(400).json({ errors: 'That user dose not exisits! Please check login details' });
  } else {

    let userId = user._id

    try {

      let token = jwtSignin(req, res, next, { userId: userId })
      // var token = jwt.sign({ id: userId }, config.secret, {
      //   expiresIn: 86400 // expires in 24 hours
      // });
      res.status(200).send({ auth: true, token: token, user });

    } catch (err) {
      return next(err)
    }
  }
});



router.get('/location', async function (req, res) {


  googleMapsClient.geocode({ address: '201012 rail kunj ghaziabad' })
    .asPromise()
    .then((response) => {
      return res.status(200).send(response.json.results);
    })
    .catch((err) => {
      return res.status(200).send(err);
    });

});


module.exports = router;
