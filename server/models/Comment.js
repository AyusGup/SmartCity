const mongoose= require("mongoose");

const commentSchema = new mongoose.Schema({
    post_id: String,
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    comment: String,
});
const comment = mongoose.model('comment', commentSchema);

module.exports= comment;