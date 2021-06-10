const Likes  = require('../models/Likes')
const Dislikes  = require('../models/Dislikes')

const express = require('express')
const router = express.Router();



router.post('/getLikes',(req,res)=>{
    const {videId,
        userId,
        commentId} = req.body
        if(videId){
            let likes = Likes.find({videId}).exec((err,likes)=>{
               return res.status(200).json({likes})
            })
        }else{
            let likes = Likes.find({commentId}).exec((err,likes)=>{
                return res.status(200).json({likes})
            })
        }
})


router.post('/getDisLikes',(req,res)=>{
    const {videId,
        userId,
        commentId} = req.body
        if(videId){
            let likes = Dislikes.find({videId}).exec((err,likes)=>{
               return res.status(200).json({likes})
            })
        }else{
            let likes = Dislikes.find({commentId}).exec((err,likes)=>{
                return res.status(200).json({likes})
            })
        }
})


router.post('/setLikes',(req,res)=>{
    const {videId,
        userId,
        commentId} = req.body
        if(videId){
            let likes = Likes.find({videId,userId}).exec((err,likes)=>{
                console.log(likes)
               if(likes.length){
                   return res.status(400).json({err:"Already Liked"})
               }else{
                    Dislikes.deleteMany({videId,userId})
                   newlikes = new Likes({videId,userId})
                   newlikes.save()

                   return res.status(200).json({success:"Liked"})

               }
            })
        }else{
            let likes = Likes.find({commentId,userId}).exec((err,likes)=>{
                console.log(likes)

                if(likes.length){
                    return res.status(400).json({err:"Already Liked"})
                }else{
                    Dislikes.deleteMany({commentId,userId})
                    newlikes = new Likes({commentId,userId})
                    newlikes.save()
                   return res.status(200).json({success:"Liked"})
                }
             })
        }
})


router.post('/setDisLikes',(req,res)=>{
    const {videId,
        userId,
        commentId} = req.body
        if(videId){
            let likes = Dislikes.find({videId,userId}).exec((err,likes)=>{

               if(likes.length){
                   return res.status(400).json({err:"Already Liked"})
               }else{
                   Likes.deleteMany({videId,userId})
                   newlikes = new Dislikes({videId,userId})
                   newlikes.save()
                   return res.status(200).json({success:"Liked"})

               }
            })
        }else{
            let likes = Dislikes.find({commentId,userId}).exec((err,likes)=>{
                console.log(likes)

                if(likes.length){
                    return res.status(400).json({err:"Already Liked"})
                }else{
                    Likes.deleteMany({commentId,userId})
                    newlikes = new Dislikes({commentId,userId})
                    newlikes.save()

                   return res.status(200).json({success:"Liked"})
                }
             })
        }
})


module.exports = router;
