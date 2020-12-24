const express = require('express')
const router = express.Router()

const {
    createBugController,
    getBugsController,
    getUsersController,
    getBugByIdController,
    createNewComController,
    getCommentsController,
    updateBugController,
    getBugsStatsController
} =require('../controllers/dash.controller.js')


// bug : create, getAll, get by ID, update;
router.post('/bugreport',createBugController);
router.get('/',getBugsController)
router.post('/bug',getBugByIdController)
router.post('/bug/update',updateBugController)

// users: get all users
router.get('/users',getUsersController)

// comments : add new comment , get all comments for relevant bug
router.post('/bug/comment',createNewComController )
router.post('/bug/comments',getCommentsController )

// stats: get bugs by date and counter
router.post('/bugs/stats',getBugsStatsController)

module.exports = router