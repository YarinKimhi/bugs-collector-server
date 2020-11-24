const mongoose = require('mongoose')
const crypto = require('crypto')
const { timeStamp } = require('console')

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true

    },
    name:{
        type: String,
        trim: true,
        required: true
    },
    hash_password:{
        type: String,
        required: true
    },
    salt: String,
    role:{
        type: String,
        default: 'Normal'
    },
    resetPasswordLink:{
        data: String,
        default: ''
    }
},{timeStamp: true})

userSchema.virtual('password')
    .set(function(password){
        this.password = password
        this.salt = this.makeSalt()     // define Salt
        this.hash_password=this.encryptedPassword(password)
    })
    .get(function(){
        return this.hash_password    
    })

userSchema.methods = {
    
    makeSalt: function(){
        return Math.round(new Date().valueOf() * Math.random())+ ''
    },
    encryptedPassword: function(password){
        if(!password) return ''
        try{   
            return crypto
                .createHmac('sha1',this.salt)
                .update(password)
                .digest('hex')
        }
        catch(err){
            return ''
        }
    },
    authenticate: function(plainPassword){
        return this.encryptedPassword(plainPassword) === this.hash_password
    }
}

module.exports = mongoose.model('User',userSchema)