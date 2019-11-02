const { KitchenRegSchema } = require('./../models/Signup2.Model');
const express = require('express');
var nodemailer = require('nodemailer');
const axios = require('axios');

const { jwtSignin, jwtVerifyToken } = require('./../middleware/middleware')

const router = express.Router();



// this Api route is to Create New Signup in (KitchenSignup collection) database name = database 2 
router.post('/Signup2', async function (req, res, next) {

    let admin = await KitchenRegSchema.findOne({ Email: req.body.Email });

    if (admin) {

        return res.status(400).json({ errors: 'That admin already exisits! Change email id' });

    } else {

        try {
            admin = new KitchenRegSchema({
                KitchenName: req.body.KitchenName,
                Address: req.body.Address,
                State: req.body.State,
                City: req.body.City,
                Zipcode: req.body.Zipcode,
                Email: req.body.Email,
                Password: req.body.Password,
                Phone: req.body.Phone,
                confirm_password: req.body.confirm_password,
            });

            await admin.save();


            //return res.status(200).send({admin:admin,message:"data inserted"});


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




// This Api route is to login to account,if user not exist it will tell user dosent exist 


router.post('/login2', async (req, res, next) => {

    // Check if this user already exisits
    let admin = await KitchenRegSchema.findOne({ Email: req.body.Email, Password: req.body.Password });
    if (!admin) {
        return res.send({ errors: 'That admin dose not exisits! Please check login details' });

    } else {

        let adminId = admin._id

        try {
            req.session.email = req.body.Email
            let token = jwtSignin(req, res, next, { adminId: adminId })
            return res.send({ auth: true, token: token, email: admin.Email });


        } catch (err) {
            return next(err)
        }
    }
});

// 
router.get('/list', jwtVerifyToken, async (req, res, next) => {
    console.log("session information===",req.session.email)
    let admin = await KitchenRegSchema.find();

    let weather = await axios.get('https://reqres.in/api/users?page=2').then(resp => {

        return resp.data;
    });

    return res.status(200).send({ list: admin,weather:weather });
});




module.exports = router;