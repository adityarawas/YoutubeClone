const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = Schema({
    writer:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    postId:{
        type:Schema.Types.ObjectId,
        ref:'Videos'
    },
    responseTo:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    comment:String
},{
    timestamp:true
});

const Comments = mongoose.model('Comments', commentSchema);
module.exports = {Comments}