const express = require('express')
const router = express.Router()

const {
    validRegister,
    validLogin,
    forgotPassword,
    resetPasswordValidator
} = require('../helpers/valid')


const {
    registerController,
    activationCotroller
} = require('../controllers/auth.controller.js')

router.post('/register',validRegister, registerController)
router.post('/activation', activationCotroller)

module.exports = router