const { Admin } = require('./../models/admin');
const { State } = require('./../models/state');
const express = require('express');
var nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');
const { jwtSignin, jwtVerifyToken, validateMeChecks } = require('./../middleware/middleware')
const bcrypt = require('bcrypt')
const rounds = 10
const router = express.Router();


router.post('/registration', async function (req, res, next) {


    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array({ onlyFirstError: true }) });
    }


    let admin = await Admin.findOne({ email: req.body.email });

    if (admin) {

        return res.status(200).json({ errors: 'That admin already exisits! Change email id' });

    } else {

        let hashPassword = bcrypt.hashSync(req.body.password, rounds);

        try {
            admin = new Admin({
                full_name: req.body.full_name,
                company_name: req.body.company_name,
                state: req.body.state,
                zipcode: req.body.zipcode,
                email: req.body.email,
                password:hashPassword,
                agreement_policy: req.body.agreement_policy,
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
                subject: 'Welcome to FoodApp for registration',
                text: `Welcome! ${req.body.full_name}`
            };

            //sending email method or function
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });


            return res.status(200).send({ response: admin});

        } catch (err) {
            return next(err)
        }
    }
});


router.post('/login', validateMeChecks,async (req, res, next) => {


    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array({ onlyFirstError: true }) });
    }

    
    // Check if this user already exisits
    let admin = await Admin.findOne({ email: req.body.email, status: true });
    let compPassword =  bcrypt.compareSync(req.body.password, admin.password)

    if (compPassword==false) {

        return res.status(200).json({ errors: 'That admin dose not exisits! Or deactivated, Please check login details' });

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

router.post('/addState', async function (req, res, next) {


    let state = await State.findOne({ label: req.body.label });

    if (state) {

        return res.status(400).json({ errors: 'That state already exisits! Change state label' });

    } else {

        try {
            state = new State({
                label: req.body.label,
                name: req.body.name,
                zipcode: req.body.zipcode,
                parent_id: req.body.parent_id

            });

            await state.save();

            return res.status(200).send({ response: state });

        } catch (err) {
            return next(err)
        }
    }
});

router.get('/stateList', async (req, res, next) => {

    // Check if this user already exisits
    let state = await State.find({ parent_id: '0', status: true });

    if (!state) {

        return res.status(200).json({ errors: 'No State Found!.' });

    } else {

        try {

            res.status(200).send({ state: state });

        } catch (err) {
            return next(err)
        }
    }
});

router.get('/countyList', async (req, res, next) => {

    // Check if this user already exisits
    let state = await State.find({ parent_id: req.query.parent_id, status: true });
    if (!state) {

        return res.status(200).json({ errors: 'No State Found!.' });

    } else {

        try {

            res.status(200).send({ county: state });

        } catch (err) {
            return next(err)
        }
    }
});


module.exports = router;
