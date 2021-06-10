import React, {useState, useEffect} from 'react'
import {Comment, Avatar, Button, Input} from 'antd'
import Axios from 'axios';
import {useSelector} from 'react-redux'
import LikeDisLike from './LikeDisLike';
const {TextArea} = Input

const CommentList = ({comment, postId}) => {
    const user = useSelector(state =>state.user)
    const [commemtValue, setCommentValue] = useState("");
    const [opentoreply, setOpentoreply] = useState(false);
    const [replies, setReplies] = useState([]);

    const actions = [
        <LikeDisLike comment userId={localStorage.getItem('userId')} commentId={comment._id}/>,
        <span onClick={()=>{setOpentoreply(!opentoreply)}} key="comment-basic-reply-to">{replies.length ? `View ${replies.length} comments` : `Reply` }</span>
    ]
    const handelCommentChange = (e) =>{setCommentValue(e.target.value)}
    const submitComments = () => {
        const variables = {
            writer:user.userData._id,
            postId:postId,
            responseTo:comment._id,
            comment:commemtValue,
        }
            Axios.post('/api/comment/saveComment',variables)
            .then(resp=>{
                if(resp.status == 200){
                    setReplies([...replies,resp.data.comment])
                    console.log(resp.data)
                }else{
                    alert('Error')
                }
            })
    }

    useEffect(() => {
        const variables = {

            responseTo:comment._id,
        }
        Axios.post('/api/comment/getreplies',variables)
        .then(resp=>{
            if(resp.status==200){
                setReplies(resp.data)
            }else{
                alert('Cannot find replies')
            }
        })
    }, [])

    return (
            <div>
            <Comment actions={actions} author={comment.writer.name} avatar={<Avatar src={comment.writer.image}/>} content={<p>{comment.comment}</p>} style={{padding:0}} />
            <form style={{marginLeft: "3rem"}}>
                {opentoreply &&            <> 

                {replies.length > 0 ?
                replies.map(i=> {
               
                        return <Comment  author={i.writer.name} avatar={<Avatar src={i.writer.image}/>} content={<p>{i.comment}</p>} style={{padding:0}} />})
                     : <p>Be first to reply</p>
                }
<div style={{display:'flex'}}>
<TextArea 
                    style={{width:'100%', borderRadius: '5px'}}
                    onChange={handelCommentChange}
                    value={commemtValue}
                    placeholder="Write your comments"
                />
                <Button style={{height:"50px"}} onClick={submitComments}>
                    Submit
                </Button>
</div>

                </>
                }
            </form>
            
            </div>
    )
}

export default CommentList
