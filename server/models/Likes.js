const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    commentId:{
        type:Schema.Types.ObjectId,
        ref:"Comments"
    },
    videId:{
        type:Schema.Types.ObjectId,
        ref:"Videos"
    }

},{timestamps:true})

const Likes = mongoose.model('Likes',likeSchema);
module.exports = Likes