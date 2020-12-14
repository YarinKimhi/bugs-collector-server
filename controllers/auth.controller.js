const User = require('../models/auth.model')
const _ = require('lodash')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const {errorHandler} = require ('../helpers/dbErrorHandling')



exports.registerController = (req,res) => {
    const {name,email,password} = req.body
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const firstError = errors.array().map(error=> error.msg)[0]
        return res.status(422).json({
            error:firstError
        })
    }else{
        User.findOne({
            email
        }).exec((err,user)=>{
            if(err){
                return res.status(400).json({
                    error: "Something went wrong try again"
                })
            }
            if(user){
                return res.status(400).json({
                    error: "Email is taken"
                })
            }else{
                const user =new User({
                    name,
                    email,
                    password
                })
                user.save((err,user)=>{
                    if(err){
                        return res.status(401).json({
                            error:errorHandler(err)
                        })
                    }else{
                        return res.json({
                            success: true,
                            message: 'Signup success',
                            user
                        })
                    }
                }) 
            }
        })
    }
}


exports.loginController = (req,res)=>{
    const {email,password} = req.body
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const firstError = errors.array().map(error=> error.msg)[0]
        return res.status(422).json({
            error:firstError
        })
    }else{
        User.findOne({
            email
        }).exec((err,user)=>{
            if(err || !user){
                return res.status(401).json({
                    error:'User not exist'
                })
            }
            if(!user.authenticate(password)){
                return res.status(400).json({
                    error:'Wrong password,try again'
                    })
            }    
            const token = jwt.sign(
                {
                    _id:user._id,
                    name:user.name,
                },process.env.JWT_SECRET,
                {
                    expiresIn:'7d'
                }
            )
            const {_id,name,email,role} = user
            return res.json({
                token,
                user:{
                    _id,
                    name,
                    email,
                    role
                }
            })

        })
    }
}