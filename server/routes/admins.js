const { Admin } = require('./../models/admin');
const express = require('express');
var nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');
const { jwtSignin, jwtVerifyToken,validateMeChecks } = require('./../middleware/middleware')


const router = express.Router();


router.post('/registration',validateMeChecks, async function (req, res, next) {


    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array({ onlyFirstError: true }) });
    }


    let admin = await Admin.findOne({ email: req.body.email });

    if (admin) {

        return res.status(400).json({ errors: 'That admin already exisits! Change email id' });

    } else {

        try {
            admin = new Admin({
                name: req.body.name,
                email: req.body.email,
                last_name: req.body.last_name,
                password: req.body.password,
                confirm_password: req.body.confirm_password,
            });

            await admin.save();


            //sending email from 
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'dineout2018@gmail.com',
                    pass: 'dineout@2018'
                }
            });

            // sending mail to 
            var mailOptions = {
                from: 'dineout2018@gmail.com',
                to: 'singh.varun1985@gmail.com,Syedhaq5511@gmail.com',
                subject: 'Sending Email using Node.js test mail',
                text: 'That was easy node class Today!'
            };

            //sending email method or function
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });


            return res.status(200).send({ response: admin, 'route': 'https://yahoo.com' });

        } catch (err) {
            return next(err)
        }
    }
});

router.post('/login', async (req, res, next) => {

    // Check if this user already exisits
    let admin = await Admin.findOne({ email: req.body.email, password: req.body.password });

    if (!admin) {

        return res.status(400).json({ errors: 'That admin dose not exisits! Please check login details' });

    } else {

        let adminId = admin._id

        try {

            let token = jwtSignin(req, res, next, { adminId: adminId })

            res.status(200).send({ auth: true, token: token, admin });

        } catch (err) {
            return next(err)
        }
    }
});


router.get('/list', async (req, res, next) => {
    let admin = await Admin.find().sort("-_id");
  return res.status(200).send({ admin: admin });

});




module.exports = router;
