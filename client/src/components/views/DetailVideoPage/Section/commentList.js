import React from 'react'
import {Comment, Avatar, Button, Input} from 'antd'
const {TextArea} = Input

const CommentList = ({comment, postId}) => {
    const actions = [
        <span onClick key="comment-basic-reply-to">Reply to </span>
    ]
    const handelCommentChange = () =>{}
    return (
            <div>
            {comment.comment}
            <Comment actions={actions} author avatar={<Avatar />} content={<p></p>} />
            <form>
            <TextArea 
                    style={{width:'100%', borderRadius: '5px'}}
                    onChange={handelCommentChange}
                    value={comment}
                    placeholder="Write your comments"
                />
            </form>
            
            </div>
    )
}

export default CommentList
