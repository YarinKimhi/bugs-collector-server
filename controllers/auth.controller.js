const User = require('../models/auth.model')
const _ = require('lodash')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const {errorHandler} = require ('../helpers/dbErrorHandling')
const { use } = require('../routes/auth.route')


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



exports.updateUserController = (req,res) => {
    const {id,name,password,confirmpassword} = req.body
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const firstError = errors.array().map(error=> error.msg)[0]
        return res.status(422).json({
            error:firstError
        })
    }else{
        User.findById(id).exec((err,user)=>{
            if(err){
                return res.status(401).json({
                    error:"No User please try login again"
                })
            }else{ 
                let valid = password.match(/\d+/g);
                let stringPass = String(password)
                if(password === confirmpassword && password !==''  ){ // if password empty will update name only
                    if(stringPass.length >=6 && valid!==null){ // password not empty - check if password is valid structue
                        user.name = name
                        user.password = password
                    }else{
                        return res.status(422).json({
                            error:'password must contain 6 characters and one number at least'
                        })
                    }
                }else{ 
                    user.name = name
                }
                user.save((err)=>{
                    if(err){
                        return res.status(401).json({
                            error:errorHandler(err)
                        })
                    }else{
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
                            message: 'update successfuly',
                            token,
                            user:{
                                _id,
                                name,
                                email,
                                role
                            }
                        })
                    }
                })
            }
        })
    }
}