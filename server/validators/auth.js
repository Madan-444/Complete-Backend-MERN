const {check} = require('express-validator')

exports.userSignupValidator = [
    check('name')
    .not()
    .isEmpty()
    .withMessage('Name is required'),
    check('email')
    .not()
    .isEmpty()
    .withMessage('Must be a valid email address'),
    check('password')
    .isLength({min: 6})
    .not()
    .withMessage('Password must at least 6 charecter Long')
];
exports.userSigninValidator = [
    check('email')
    .not()
    .isEmpty()
    .withMessage('Must be a valid email address'),
    check('password')
    .isLength({min: 6})
    .not()
    .withMessage('Password must at least 6 charecter Long')
];
exports.forgotPasswordValidator = [
    check('email')
    .not()
    .isEmpty()
    .isEmail()
    .withMessage('Must be a valid email address'),
];
exports.resetPasswordValidator = [
    check('newPassword')
    .not()
    .isEmpty()
    .isLength({min: 6})
    .withMessage('Password must at least 6 charecter Long')
];