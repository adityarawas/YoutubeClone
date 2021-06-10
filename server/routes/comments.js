const { Comments } = require("../models/Comment");
const express = require('express')
const router = express.Router();

router.post('/saveComment',(req, res)=>{
    const comment = new Comments(req.body)
    comment.save((err, comment) =>{
        if(err) return res.status(500).json({err})
        Comments.findById(comment._id).populate('writer','-password')
        .exec((err,comment)=> res.status(200).json({comment}))
    })
});

router.post('/getComments',(req, res)=>{
       Comments.find({"postId":req.body.videoId})
       .populate('writer','-password')
       .exec((err, comment)=>{
            if (err) return res.json({err})
            res.status(200).json(comment)
       })
});

router.post('/getreplies',(req, res)=>{
    Comments.find({"responseTo":req.body.responseTo})
    .populate('writer','-password')
    .exec((err, comment)=>{
         if (err) return res.json({err})
         res.status(200).json(comment)
    })
});


module.exports = router
