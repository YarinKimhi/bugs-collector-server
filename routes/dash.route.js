const express = require('express')
const router = express.Router()

const {
    createBugController,
    getBugController,
    getBugByIdController,
} =require('../controllers/dash.controller.js')


router.post('/bugreport',createBugController);
router.get('/',getBugController)
router.post('/bug',getBugByIdController)

module.exports = router