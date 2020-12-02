const User = require('../models/auth.model')
const Bug =require('../models/bug.model')
const exppressJwt = require('express-jwt')
const _ = require('lodash')
const {OAuth2Client} = require('google-auth-library')
const fetch = require('node-fetch')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const {errorHandler} = require ('../helpers/dbErrorHandling')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)




exports.createBugController = (req,res)=> {
    //console.log(req.body)
    const {token,headline,description,team,severity} =req.body
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        const firstError = errors.array().map(error=> error.msg)[0]
        return res.status(422).json({
            error:firstError
        })
    }else{
        jwt.verify(token , process.env.JWT_SECRET, 
            (err,decode)=>{
                if(err){
                    return res.status(401).json({
                        error:'Expired Token, signup again'
                    })
                }else{
                    const {name} = jwt.decode(token)
                    const bug = new Bug({
                        nameCreator:name,
                        headline,
                        description,
                        team,
                        severity
                    })
                    bug.save((err,bug)=> {
                        if(err){
                            return res.status(422).json({
                                error:errorHandler(err)
                            })
                        }else{
                            return res.status(200).json({
                                message:'Your bug have been reported'
                            })
                        }
                    })
                }   
            }
        )
    }
}


exports.getBugController = (req,res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const firstError = errors.array().map(error=> error.msg)[0]
        return res.status(422).json({
            error:firstError
        })
    }else{
        Bug.find().exec((err,bugs)=>{
            if(err){
                console.log(err)
                return res.status(401).json({
                    error:'User not exist'
                })
            }else{
                return res.status(200).json({
                    bugs
                })
            }
        })
    }
}
