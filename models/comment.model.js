const mongoose = require('mongoose')
const { model } = require('./auth.model')
const commentSchema = mongoose.Schema({
    user_id:{
        type: String,
        trim: true,
        required: true
    },
    bug_id:{
        type: String,
        trim: true,
        required: true
    },
    comment:{
        type: String,
        trim: true,
        required: true
    },
    time:{
        type: Date,
        trim: true,
        required: true
    }
})

module.exports = mongoose.model('Comment',commentSchema)