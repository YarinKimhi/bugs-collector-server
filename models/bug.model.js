const mongoose  = require("mongoose");

const bugSchema = new mongoose.Schema({
    nameCreator:{
        type: String,
        trim: true,
        required: true
    },
    headline:{
        type: String,
        trim: true,
        required: true
    },
    description:{
        type: String,
        trim: true,
        required: true
    },
    team:{
        type: String,
        trim: true,
        required: true
    },
    severity:{
        type: String,
        trim: true,
        required: true 
    },
    status:{
        type: String,
        trim: true,
        required: true 
    },
    assign:{
        type: String,
        trim: true,
        required: true 
    },
    time:{
        type: Date,
        default: new Date(),
    }
},{timeStamp: true}) 

module.exports = mongoose.model('bug',bugSchema)