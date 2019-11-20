const { body, check } = require('express-validator');
const jwt = require('jsonwebtoken')
var config = require('./../config');

//google api key
//AIzaSyAT6FYiijBpihz6CdaXboE-S1Vdohh7NLU



//use for uplaod image
const multer = require('multer');
//end here


// Multer use for image upload set image directory location
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
// end

module.exports = {
    validateMeChecks: [
        check('email','Email is required.').not().isEmpty().isEmail().withMessage('Please check email.')
        // check('full_name', 'Full name length in between 7 to 50 chars').
        //     isLength({ min: 7, max: 50 }),
        // check('last_name', 'Last name length in between 7 to 50 chars').
        //     isLength({ min: 5, max: 50 }),
        // check('mobile').
        //     isLength({ min: 10, max: 10 }).
        //     withMessage('Mobile no length shuld be 10 chars'),
        // check('password', 'Password length in between 5 to 124 chars').
        //     isLength({ min: 5, max: 124 }),
        // check('confirm_password', 'Confirm Password length in between 5 to 124 chars').
        //     isLength({ min: 5, max: 124 }),
        // check('zipcode', 'Zipcode must be only integer and length between 5 to 6 chars').
        //     isInt().
        //     isLength({ min: 5, max: 6 }),
        // check('country', 'Country can not leave empty').
        //     not().isEmpty(),
        // check('state', 'State can not leave empty').
        //     not().isEmpty(),
        // check('city', 'City can not leave empty').
        //     not().isEmpty()

    ],
    
    jwtVerifyToken: function (req, res, next) {
        //console.log('come inside verify token' , req)
        var token = req.headers['x-access-token'];
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            return next();
        });

    },

    jwtSignin: function (req, res, next, { userId }) {
        //console.log("come",userId)

        var token = jwt.sign({ id: userId }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        next();
        return token

    },
    
    upload: multer({ storage: storage }),

}