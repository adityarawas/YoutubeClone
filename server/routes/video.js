const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require('path');
const ffmpeg = require('fluent-ffmpeg')
const {Videos} = require('../models/Video')
const Subscriber  = require('../models/Subscribers');

//=================================
//             VIDEOS
//=================================
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
});

var upload = multer({ storage: storage }).single("file")


router.post("/uploadfiles", (req, res) => {
    upload(req, res, err=>{
        if(err){
            return res.status(500).json({'error':err})
        }
        return res.status(200).json({success:true, filePath: res.req.file.path, fileName:res.req.file.filename})
    })
});

router.post("/thumbnail",(req, res)=>{
    if(req.body.filePath){
        let thumbsFilePath = "";
        let fileDuration = ""
        ffmpeg.ffprobe(req.body.filePath, (err,metadata)=>{

            fileDuration = metadata.format.duration
        })

        ffmpeg(req.body.filePath)
        .on('filenames',function(filenames){
            console.log(`Will generate ${filenames.join(',')}`)
            thumbsFilePath = "thumbanils/" + filenames[0]
        })
        .on('end',function(){
            console.log(`SCREEN SHOTS TAKEN`)
            return res.status(200).json({thumbsFilePath , fileDuration})
        })
        .screenshots({
            count: 1,
            folder: 'thumbanils',
            size:"320x240",
            filename:`${Date.now()}thumbnail-%b.png`
        })
    }

});

router.post('/uploadVideos',(req, res)=>{
    const videos = new Videos(req.body)
    videos.save((err,video)=>{
        if(err) res.status(500).json({error:err})
        return res.status(200).json({
            success:true
        })
    })
});

router.get('/getVideos',(req,res)=>{
    Videos.find({privacy:1}).populate('writer','-password').exec((err, videos)=>{
        if(err) return res.status(500).json({err:err})
        res.status(200).json({success:true,videos})
    })
});

router.post('/getSubscribedVideos',(req,res)=>{
    const {userFrom} = req.body
    Subscriber.find({'userFrom':userFrom}).exec((err,subscribers)=>{
       if(err) return res.status(500).json({err});
        let subUser = []
        subscribers.map(i=>subUser.push(i.userTo))
        Videos.find({writer:{$in : subUser}}).populate('writer','-password')
        .exec((err, videos)=>{
            if(err) return res.status(500).send(err);
            res.status(200).json({videos:videos})
        })
    })
});


router.post('/getSideVideos',(req,res)=>{
    const {videoId} = req.body
    Videos.find({ _id: {$ne: videoId}, privacy:1}).populate('writer','-password').exec((err, videos)=>{
        if(err) return res.status(500).json({err:err})
        res.status(200).json({success:true,videos})
    })
});

router.post('/getVideo',(req,res)=>{
   const {videoId} = req.body
   Videos.findById(videoId).populate('writer','-password').then((video)=>{
       if(video){
        return res.status(200).json({video:video})
       }
   }).catch(err=>{
         return res.status(500).json({err:err})

   })
})
module.exports = router;
