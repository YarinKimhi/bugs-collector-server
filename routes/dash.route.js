const express = require('express')
const router = express.Router()

const {
    createBugController,
    getBugsController,
    getBugByIdController,
    createNewComController,
    getCommentsController,
    updateBugController
} =require('../controllers/dash.controller.js')


router.post('/bugreport',createBugController);
router.get('/',getBugsController)
router.post('/bug',getBugByIdController)
router.post('/bug/comment',createNewComController )
router.post('/bug/comments',getCommentsController )
router.post('/bug/update',updateBugController)

module.exports = router