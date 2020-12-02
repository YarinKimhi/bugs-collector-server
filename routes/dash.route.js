const express = require('express')
const router = express.Router()

const {
    createBugController,
    getBugController
} =require('../controllers/dash.controller.js')


router.post('/bugreport',createBugController);
router.get('/',getBugController)

module.exports = router