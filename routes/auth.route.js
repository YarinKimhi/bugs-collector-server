const express = require('express')
const router = express.Router()

const {
    validRegister,
    validLogin,
} = require('../helpers/valid')

const {
    registerController,
    loginController
} = require('../controllers/auth.controller.js')

router.post('/register',validRegister, registerController)
router.post('/login',validLogin, loginController)

module.exports = router

//router.post('/activation', activationCotroller)