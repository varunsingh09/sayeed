const { User } = require('./../models/user');
const express = require('express');
var nodemailer = require('nodemailer');
const router = express.Router();
const { validationResult } = require('express-validator/check');
const m = require('./../middleware/middleware')

router.get('/', async (req, res) => {
    console.log('get user profile.')
    let user = await User.find().sort("-_id");
    console.log(user.length)
    if (user.length === 0) {
        res.send('User not found')
    } else {

        res.status(400).send(user);
    }


});

router.post('/', m.validateMeChecks, async (req, res, next) => {


    // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ errors: 'That user already exisits! Change email id' });
    } else {

        try {
            console.log(req.body)
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
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            

            res.send(user);

        } catch (err) {
            return next(err)
        }

    }
});

module.exports = router;
