const mongoose = require('mongoose');
const Schema  = mongoose.Schema
const videoSchema = mongoose.Schema({
    writer:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        length:50
    },
    description:String,
    privacy:Number,
    filePath:String,
    category:Number,
    views:{
        type:Number,
        default:0
    },
    duration:{
        type:String
    },
    thumbnail:String
},{timestamp:true})

const Videos = mongoose.model('Videos',videoSchema)
module.exports = {Videos}