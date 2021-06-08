import React, { useEffect, useState } from 'react'
import {Card, Avatar, Col, Typography, Row} from 'antd'
import {Link} from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import {useSelector} from 'react-redux'
const {Title} = Typography
const {Meta} = Card

const VideoCard = ({i}) =>{
    return (
        <>
        <div style={{margin:'1rem'}}>
            <div style={{position:'relative'}}>
                <img style={{width:"100%"}} src={`http://localhost:5000/${i.thumbnail}`} />
                <div className="duration" style={{position:"absolute",bottom:0,right:0, color:'#fff', background:'#0000008c', padding:'0.2rem'}}>
                     <span>{`${Math.floor(i.duration / 60)} : ${Math.floor(i.duration) - Math.floor(i.duration / 60)} `}</span>
                </div>
            </div>
       
</div>
<Meta  avatar={<Avatar src={i.writer.image}/> } title={i.title} />
<span>
    {i.writer.name}
</span>
<span style={{marginLeft:'3rem'}}>{i.views}</span>
- <span>{moment(i.createdAt).format("MMM-DD-YY")}</span>
</>
    )
}

const Subscription = () => {
    const user = useSelector(state =>state.user)

    const [videos, setVideos] = useState()
    
    useEffect(() => {
        console.log(user)
        axios.post('/api/videos/getSubscribedVideos',{userFrom:localStorage.getItem('userId')})
        .then(resp =>{
            console.log(resp)
            if(resp.status===200){
                    setVideos(resp.data.videos)
            }else{
                alert('Failed to get videos')
            }
        })
    }, [])
    return (
        
           <div style={{width:"85%", margin:'3rem auto'}}>
                <Title level={2}>Your Subscriptions</Title>
                <hr />
                <div>
                    <Row>
                    {videos?.length > 0 && videos.map((i,idx)=>
                    <Col key={idx} lg={6} md={8} xs={24}>
                           <Link to={`/video/${i._id}`} ><VideoCard i={i} /> </Link>
                    </Col>
                    )}
                    </Row>
                </div>
           </div>
    )
}

export default Subscription
