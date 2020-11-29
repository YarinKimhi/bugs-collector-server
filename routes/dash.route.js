const express = require('express')
const router = express.Router()

const {
    createBugController
} =require('../controllers/dash.controller.js')


router.post('/bugreport',createBugController);

module.exports = router