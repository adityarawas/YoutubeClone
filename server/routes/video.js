const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require('path');
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
})

var upload = multer({ storage: storage }).single("file")


router.post("/uploadfiles", (req, res) => {
    upload(req, res, err=>{
        if(err){
            return res.status(500).json({'error':err})
        }
        return res.status(200).json({success:true, filePath: res.req.file.path, fileName:res.req.file.filename})
    })
});


module.exports = router;