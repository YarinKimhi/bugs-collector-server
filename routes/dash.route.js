const express = require('express')
const router = express.Router()

const {
    createBugController,
    getBugsController,
    getBugByIdController,
    createNewComController,
    getCommentsController
} =require('../controllers/dash.controller.js')


router.post('/bugreport',createBugController);
router.get('/',getBugsController)
router.post('/bug',getBugByIdController)
router.post('/bug/comment',createNewComController )
router.get('/bug/comments',getCommentsController )

module.exports = router