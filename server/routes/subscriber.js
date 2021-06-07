const Subscriber  = require('../models/Subscribers')
const express = require('express')
const router = express.Router();

router.post('/subscriberNumber',(req,res)=>{
    Subscriber.find({"userTo": req.body.userTo}).exec((err,subs)=>{
        if(err) return res.status(500).json({err})
        let isSubs = false
        console.log(subs)
        const iam_subs = subs.filter(i=>{
            console.log(i, req.body.userFrom, subs.length)
            return i.userFrom == req.body.userFrom
        })
        if(iam_subs.length){
            isSubs = true
        }
        return res.status(200).json({subsNumbers:subs.length || 0, isSubs})
    })
})
router.post('/subscribetochannel',(req,res)=>{
    Subscriber.find({"userTo": req.body.userTo, "userFrom":req.body.userFrom}).exec((err,subs)=>{
        if(err) return res.status(500).json({err})
        let isSubs = false
        if(subs.length){
            isSubs = true
            return res.status(200).json({subsNumbers:subs.length || 0, isSubs})

        }else{
            let subs = new Subscriber({"userTo":req.body.userTo,"userFrom":req.body.userFrom})
            subs.save((err,video)=>{
                if(err) res.status(500).json({error:err})
                isSubs = true
                return res.status(200).json({subsNumbers:subs.length || 0, isSubs})
            })
        }
    })
})
router.post('/unsubscribetochannel',(req,res)=>{
    Subscriber.deleteMany({"userTo": req.body.userTo, "userFrom":req.body.userFrom}).exec((err,subs)=>{
        if(err) return res.status(500).json({err})
        let isSubs = false
        Subscriber.find({"userTo": req.body.userTo}).exec((err,subs)=>{
            if(err) return res.status(500).json({err})
            let isSubs = false
            return res.status(200).json({subsNumbers:subs.length || 0, isSubs})
        })

    })
})

module.exports = router;
