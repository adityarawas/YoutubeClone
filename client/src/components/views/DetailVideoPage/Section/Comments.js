import React, {useState} from 'react'
import {Button, Input} from 'antd'
import axios from 'axios';
import {useSelector} from 'react-redux'
import CommentList from './commentList'
const {TextArea} = Input;
const Comments = ({postId, updateComment, commentList, style}) => {
    const user = useSelector(state => state.user)
    const [comment, setComment] = useState("")
    const handelCommentChange = (e) =>{
        setComment(e.target.value)
    }
const submitComments = (e) =>{
    const variables = {
        comment,
        writer:user.userData._id,
        postId
    }
        axios.post('/api/comment/saveComment', variables)
        .then(resp=>{
            if(resp.status === 200){
                updateComment(resp.data.comment)
                setComment('')
            }else{
                alert('Failed to fetch comments')
            }
        })
}
    return (
        <div style={{...style}}>
            <p>Comments</p>

            {
                commentList?.length && commentList.map((i,idx)=>
                {
                    if(!i.responseTo ){
                        return <CommentList comment={i} postId={postId} key={idx} updateComment={updateComment} />
                    }
                }
                
                )
            }
            {/* Root Comment Form */}
            <form style={{display:"flex"}} >
                <TextArea 
                    style={{width:'100%', borderRadius: '5px'}}
                    onChange={handelCommentChange}
                    value={comment}
                    placeholder="Write your comments"
                />
                <Button style={{height:"50px"}} type="submit" onClick={submitComments}>
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default Comments
