const {check} =  require('express-validator');

exports.validRegister = [
    check('name',"Name is required")
    .notEmpty()
    .isLength({
        min:3,
        max:32
    }).withMessage('name must be with 3 to 32 characters'),
    check('email').notEmpty().withMessage('Must be a valid email address'),
    check('password','password is required').notEmpty(),
    check('password').isLength({
        min:6
    }).withMessage('password must contain 6 characters at least').matches(/\d/).withMessage('password must contain a number')
];
exports.validLogin = [
    check('email').isEmail().withMessage('Must be a valid email address'),
    check('password','password is required').notEmpty(),
    check('password').isLength({
        min:6
    }).withMessage('password must contain 6 characters at least').matches(/\d/).withMessage('password must contain a number')
];

exports.forgotPassword = [
    check('email').isEmpty().withMessage('Must be a valid email address'),
]

exports.resetPasswordValidator = [
    check('newPassword').not().isEmpty()
    .isLength({
        min:6
    }).withMessage('password must contain 6 characters at least').matches(/\d/).withMessage('password must contain a number')
];

exports.validUserUpdate = [
    check('name',"Name is required")
    .notEmpty()
    .isLength({
        min:3,
        max:32
    }).withMessage('name must be with 3 to 32 characters')
]