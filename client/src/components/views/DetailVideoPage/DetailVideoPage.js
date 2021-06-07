import { Avatar, List, Row, Col } from 'antd'
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import SideVideos from './Section/SideVideos'
import Subscribe from './Section/Subscribe'
import {useSelector} from 'react-redux'

const DetailVideoPage = (props) => {
    const user = useSelector(state =>state.user)

    let { videoId } = useParams()
    const [details, setdetails] = useState({})
    const [videos, setVideos] = useState({})


    useEffect(() => {

        const variables = {
            videoId:videoId
        }
        axios.post('/api/videos/getVideo',variables)
        .then(resp =>{
            if(resp){
                console.log(resp.data.video)
                setdetails(resp.data?.video)
            }

        })
        .catch(err=>{
          alert("Video not found")
          props.history.push('/')
        })

        axios.post('/api/videos/getSideVideos',variables)
        .then(resp =>{
            console.log(resp)
            if(resp.status===200){
                    setVideos(resp.data.videos)
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
            {/* [<LikeDislikes video videoId={postId} userId={localStorage.getItem('userId')} />] */}
            <List.Item action={[<Subscribe />]} >
                <List.Item.Meta avatar={<Avatar src={details?.writer?.image} />}
                title={<a href="" >{details?.title}</a>}
                description={details?.description} />
                <Subscribe userTo={details?.writer?._id} userFrom={user?.userData?._id}/>
            </List.Item>
        </div>
        </Col>
        <Col lg={6} xs={24}>
            <div style={{marginTop:"2rem"}}>
       
        {
            videos?.length && videos.map(i=> <Link to={`/video/${i._id}`}><SideVideos video={i}/></Link>)
        }
        
        </div>
        </Col>
        </Row>
    )
}

export default DetailVideoPage
