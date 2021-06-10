import React, { useEffect, useState } from 'react'
import {Icon, Tooltip} from 'antd'
import Axios from 'axios'
const LikeDisLike = (props) => {
    const [likes, setLikes] = useState(0)
    const [dislike, setDislike] = useState(0)
    const [LikedAction, setLikedAction] = useState("")
    const [reactionUpdate, setreactionUpdate] = useState(false)



    const sendLikes = () =>{
        const variables = {}
        if(props.videId){
            variables.videId = props.videId
            variables.userId = props.userId
        }else{
            variables.commentId = props.commentId
            variables.userId = props.userId
        }
        Axios.post('/api/likes/setLikes',variables)
        .then(resp=>{
            if(resp.status == 200){
               setLikes(likes+1)
               setLikedAction('liked')
               setreactionUpdate(!reactionUpdate)
            }else{
            }
        })
    }
    const sendDisLikes = () =>{
        const variables = {}
        if(props.videId){
            variables.videId = props.videId
            variables.userId = props.userId
        }else{
            variables.commentId = props.commentId
            variables.userId = props.userId
        }
        Axios.post('/api/likes/setDisLikes',variables)
        .then(resp=>{
            if(resp.status == 200){
                setDislike(dislike+1)
                setLikedAction('disliked')
                setreactionUpdate(!reactionUpdate)

            }else{
            }
        })
    }

    useEffect(()=>{
        const variables = {}
        if(props.videId){
            variables.videId = props.videId
            variables.userId = props.userId
        }else{
            variables.commentId = props.commentId
            variables.userId = props.userId
        }
        Axios.post('/api/likes/getLikes',variables)
        .then(resp=>{
            if(resp.status == 200){
                const mystatus = resp?.data?.likes?.filter(i=>{
                    if(i.userId == props.userId) return i
                })
                if(mystatus.length){
                    setLikedAction('liked')
                }
               setLikes(resp?.data?.likes?.length || 0)
            }else{
                console.log('------------->',resp)
            }
        })

        Axios.post('/api/likes/getDisLikes',variables)
        .then(resp=>{
            const mystatus = resp?.data?.likes?.filter(i=>{
                if(i.userId == props.userId) return i
            })
            if(mystatus.length){
                setLikedAction('disliked')
            }
            if(resp.status == 200){
                setDislike(resp?.data?.likes?.length || 0)
            }else{
                console.log('------------->',resp)
            }
        })

    },[reactionUpdate])
    return (
        <>
        <span>
            <Tooltip title="like">
                <Icon type="like" 
                theme={LikedAction === 'liked' ? 'filled' : 'outlined'}
                onClick={sendLikes}
                />
            </Tooltip>
            <span style={{paddingLeft:'8px', cursor:'auto'}}>{likes}</span>
        </span> &nbsp;&nbsp;
        <span>
        <Tooltip title="dislike">
                <Icon type="dislike" 
                theme={LikedAction === 'disliked' ? 'filled' : 'outlined'}
                onClick={sendDisLikes}

                />
            </Tooltip>
            <span style={{paddingLeft:'8px', cursor:'auto'}}>{dislike}</span>
        </span>&nbsp;&nbsp;&nbsp;&nbsp;
        </>
    )
}

export default LikeDisLike
