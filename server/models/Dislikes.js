const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dislikeSchema = mongoose.Schema({
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

const Dislikes = mongoose.model('Dislikes',dislikeSchema);
module.exports = Dislikes