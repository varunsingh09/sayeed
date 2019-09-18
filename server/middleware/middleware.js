const { check } = require('express-validator/check');

module.exports = {
    validateMeChecks: [
        check('name', 'Name length in between 3 to 50 chars').
            isLength({ min: 3, max: 50 }),
        check('email', 'Email must be only alphabetical chars').
            isEmail().
            isLength({ min: 5, max: 255 }),
        check('full_name', 'Full name length in between 7 to 50 chars').
            isLength({ min: 7, max: 50 }),
        check('last_name', 'Last name length in between 7 to 50 chars').
            isLength({ min: 5, max: 50 }),
        check('mobile').
            isLength({ min: 10, max: 10 }).
            withMessage('Mobile no length shuld be 10 chars'),
        check('password', 'Password length in between 5 to 124 chars').
            isLength({ min: 5, max: 124 }),
        check('confirm_password', 'Confirm Password length in between 5 to 124 chars').
            isLength({ min: 5, max: 124 }),
        check('zipcode', 'Zipcode must be only integer and length between 5 to 6 chars').
            isInt().
            isLength({ min: 5, max: 6 }),
        check('country', 'Country can not leave empty').
            not().isEmpty(),
        check('state', 'State can not leave empty').
            not().isEmpty(),
        check('city', 'City can not leave empty').
            not().isEmpty()

    ]
}