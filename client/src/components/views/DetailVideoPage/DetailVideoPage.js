import { Avatar, List, Row, Col } from 'antd'
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import SideVideos from './Section/SideVideos'
import Subscribe from './Section/Subscribe'
import Comments from './Section/Comments'
import LikeDisLike from './Section/LikeDisLike'
import {useSelector} from 'react-redux'

const DetailVideoPage = (props) => {
    const user = useSelector(state =>state.user)

    let { videoId } = useParams()
    const [details, setdetails] = useState({})
    const [videos, setVideos] = useState({})
    const [commentList,setComments] = useState([])
    const updateComment= (comment) =>{
        console.log(comment)
        setComments([...commentList, comment])
    }

    useEffect(() => {

        const variables = {
            videoId:videoId
        }
        axios.post('/api/videos/getVideo',variables)
        .then(resp =>{
            if(resp){
                setdetails(resp.data?.video)
            }

        })
        .catch(err=>{
          alert("Video not found")
          props.history.push('/')
        })

        axios.post('/api/videos/getSideVideos',variables)
        .then(resp =>{
            if(resp.status===200){
                    setVideos(resp.data.videos)
            }else{
                alert('Failed to get videos')
            }
        })

        axios.post('/api/comment/getComments',variables)
        .then(resp =>{
            if(resp.status===200){
                setComments(resp?.data)
            }else{
                alert('Failed to get videos')
            }
        })



    }, [videoId])

    return (
        <Row>
            <Col lg={18} xs={24}>
        <div style={{width:'100%', padding:'3rem 4rem'}}>
            <video style={{width:'100%'}} src={`http://localhost:5000/${details.filePath}`}  controls/>
            <List.Item action={[<Subscribe userTo={details?.writer?._id} userFrom={user?.userData?._id}/>,<LikeDisLike />]} >
                <List.Item.Meta avatar={<Avatar src={details?.writer?.image} />}
                title={<a href="" >{details?.title}</a>}
                description={details?.description} />
                <LikeDisLike video videoId={videoId} userId={localStorage.getItem('userId')}/>
                <Subscribe userTo={details?.writer?._id} userFrom={user?.userData?._id}/>
            </List.Item>
            <hr/>
            <Comments commentList={commentList} postId={details._id} updateComment={updateComment} style={{marginLeft:"2rem"}}/>

        </div>
        </Col>
        <Col lg={6} xs={24}>
            <div style={{marginTop:"2rem"}}>
       
        {
            videos?.length && videos.map((i,idx)=> <Link to={`/video/${i._id}`} key={idx}><SideVideos video={i}/></Link>)
        }
        
        </div>
        </Col>
        </Row>
    )
}

export default DetailVideoPage
