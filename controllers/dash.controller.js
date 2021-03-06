const User = require('../models/auth.model')
const Bug =require('../models/bug.model')
const Comment =  require('../models/comment.model')
const _ = require('lodash')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const {errorHandler} = require ('../helpers/dbErrorHandling')




exports.createBugController = (req,res)=> {   
    const {token,headline,description,team,severity,status,assign} =req.body
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
                    const timeElapsed = Date.now();
                    const today = new Date(timeElapsed);
                    const bug = new Bug({
                        nameCreator:name,
                        headline,
                        description,
                        team,
                        severity,
                        status,
                        assign,
                        time:today.toLocaleDateString()
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


exports.getBugsController = (req,res) =>{ 
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
                    error:'No bugs exist'
                })
            }else{
                return res.status(200).json({
                    bugs
                })
            }
        })
    }
}
exports.getBugByIdController =async (req,res) =>{   
    const {id} = req.body
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const firstError = errors.array().map(error=> error.msg)[0]
        return res.status(422).json({
            error:firstError
        })
    }else{
        await Bug.findById(id).exec((err,bug)=>{
            if(err){
                return res.status(401).json({
                    error:"No relevant bug"
                })
            }else{
                return res.status(201).json({
                    message:"Found relevant bug",
                    bug
                })
            }
        })

    }

}

exports.createNewComController = (req,res) =>{
    const {user_id,bug_id,commentInfo} = req.body
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const firstError = errors.array().map(error=> error.msg)[0]
        return res.status(422).json({
            error:firstError
        })
    }else{ 
        User.findById(user_id).exec((err,user)=>{
            if(err){
                return res.status(401).json({
                    error:"No relevant user"
                })
            }else{
                Bug.findById(bug_id).exec((err,bug)=>{
                    if(err){
                        return res.status(401).json({
                            error:"No relevant Bug"
                        })
                    }else{ 
                        const timeElapsed = Date.now();
                        const today = new Date(timeElapsed);
                        
                            const comment =  new Comment({
                                user_id,
                                bug_id,
                                comment:commentInfo,
                                user_name: user.name,
                                time: today.toLocaleString()
                            })
                            comment.save((err,comment)=>{
                                if(err){
                                    return res.status(422).json({
                                        error:errorHandler(err)
                                    })
                                }else{
                                    return res.status(200).json({
                                        message:'Comment added',
                                        comment
                                    })
                                }         
                            })
                    }
                })   
            }    
        })
    }

}

exports.getCommentsController = (req,res) =>{
    const {id} = req.body
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const firstError = errors.array().map(error=> error.msg)[0]
        return res.status(422).json({
            error:firstError
        })
    }else{
        Comment.find({bug_id:id})
            .exec((err,comments)=>{
                if(err){
                    console.log(err)
                    return res.status(401).json({
                        error:'No comments exists'
                    })
                }else{
                    return res.status(200).json({
                        comments
                    })
            }
        })
    }

}

exports.updateBugController =  (req,res)=> {   
    const {token,currentBug} =req.body
    const {_id,headline,description,team,severity,status,assign} = currentBug
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const firstError = errors.array().map(error=> error.msg)[0]
        return res.status(422).json({
            error:firstError
        })
    }else{
        jwt.verify(token , process.env.JWT_SECRET, 
            (err)=>{
                if(err){
                    return res.status(401).json({
                        error:'Expired Token, signup again'
                    })
                }else{
                    const {name} = jwt.decode(token)
                    Bug.findByIdAndUpdate(_id, {
                            nameCreator:name,
                            headline,
                            description,
                            team,
                            severity,
                            status,
                            assign
                        }, ((err,result)=> {
                            if(err){ 
                                return res.status(422).json({
                                    error:errorHandler(err)
                                })
                            }else{
                                return res.status(200).json({
                                    message:'success',
                                    result
                                })
                            }
                            })
                        )
                }   
            }
        )
    }
}


exports.getUsersController = (req,res) =>{ 
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const firstError = errors.array().map(error=> error.msg)[0]
        return res.status(422).json({
            error:firstError
        })
    }else{
        User.find().exec((err,users)=>{
            if(err){
                console.log(err)
                return res.status(401).json({
                    error:'No users exists'
                })
            }else{
                return res.status(200).json({
                    users
                })
            }
        })
    }
}


exports.getBugsStatsController = async (req,res) =>{ 
    const {start,finish} = req.body
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const firstError = errors.array().map(error=> error.msg)[0]
        return res.status(422).json({
            error:firstError
        })
    }else{
         await Bug.aggregate(
            [
                { "$match": {
                    "time": { 
                        "$gte": new Date(start), "$lt": new Date(finish)
                    }
                }},
                { "$group": {
                    "_id": { 
                        "year":  { "$year": "$time" },
                        "month": { "$month": "$time" },
                        "day":   { "$dayOfMonth": "$time" }
                    },
                    "count": { "$sum": 1 }
                }}
            ],
            ((err,result) => {
                if(err){
                    console.log(err)
                    return res.status(401).json({
                        error:'No relevant data'
                    })
                }else{
                    return res.status(200).json({
                        result
                    })
                }
            })
        );
    }
}
