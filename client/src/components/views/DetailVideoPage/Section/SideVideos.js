import React, {useEffect, useState} from 'react'
import { Card, Avatar } from 'antd'

const SideVideos = ({video}) => {
    const { Meta } = Card;

    return (
            
        <Card style={{ width: 300, marginTop: 16 }} >
        <img src={`http://localhost:5000/${video.thumbnail}`}  style={{ width: '100%'}}/>
        <center>  <h3 style={{marginTop:'1rem'}}>{video.title}</h3></center>
        <div style={{display:'flex',justifyContent:'space-around'}}>
                <span>{video.views}</span> - 
                <span>{`${Math.floor(video.duration / 60)} : ${Math.floor(video.duration) - Math.floor(video.duration / 60)} `}</span> 
        </div>
      </Card>

    )
}

export default SideVideos
