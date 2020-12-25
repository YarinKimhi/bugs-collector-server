const express = require('express')
const router = express.Router()

const {
    validRegister,
    validLogin,
    validUserUpdate
} = require('../helpers/valid')

const {
    registerController,
    loginController,
    updateUserController
} = require('../controllers/auth.controller.js')

router.post('/register',validRegister, registerController)
router.post('/login',validLogin, loginController)
router.post('/update',validUserUpdate, updateUserController)

module.exports = router
