import React, {useState, useEffect} from 'react'
import {Typography, Button, Form, message, Input, Icon, Select} from 'antd'
import Dropzone from 'react-dropzone';
import axios from 'axios'
const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const UploadVideoPage = () => {
    const [title, setTitle] = useState('')
    const [descrption, setDescription] = useState('')
    const [video_status, setideo_status] = useState([
        {value:0, label:'Private'},
        {value:1, label:'Public'}
    ])
    const [video_category, setVideo_category] = useState([
        { value: 1, label: "Film & Animation" },
        { value: 2, label: "Autos & Vehicles" },
        { value: 3, label: "Music" },
        { value: 4, label: "Pets & Animals" },
        { value: 5, label: "Sports" },
    ])
    const [status, setStatus] = useState(0)
    const [category, setCategory] = useState(0)
    const [filePath, setFilePath] = useState("")
    const onDrop = (files) => {
        let formData = new FormData();
        const config ={
            header: {'content-type':'multipart/form-data'}
        }
        let filename = files[0].name
        filename = filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename;
        if(filename == 'mp4'){
            formData.append('file',files[0])
            axios.post('/api/videos/uploadfiles',formData,config)
            .then(resp => {
                console.log(resp)
                if(resp.data.success){
                    let variable = {
                        filePath : resp.data.filePath,
                        fileName: resp.data.fileName
                    }
                    setFilePath(resp.data.filePath)

                    //generateThumbnail

                }else{
                    alert("Failed to save video")
                }
            })
        }else{
            alert("Only mp4 formats are allowed")
        }

    }

    return (
        <div style={{maxWidth:"700px", margin:'2rem auto'}}>
            <div style={{textAlign:'center', marginBottom: '2rem'}}>
                <Title>Upload Video</Title>
            </div>
            <Form>
                <div >
                <div style={{marginTop:"40px"}}>
                <Dropzone 
                    multiple={false}
                    maxSize={80000000} onDrop={onDrop}>
                    
                    {({ getRootProps, getInputProps }) => (
                        <div style={{ width: '200px', height: '200px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            <Icon type="plus" style={{ fontSize: '3rem' }} />

                        </div>
                    )}
                </Dropzone>
                </div>
                </div>

                <div style={{marginTop:"40px"}}>
                <label forhtml="inputTitle">Title</label>
                <Input id="inputTitle" type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </div>
                <div style={{marginTop:"40px"}}>
                <label forhtml="inputDescription">Descrpition</label>
                <TextArea id="inputDescription" type="text" value={descrption}  onChange={(e)=>setDescription(e.target.value)}/>
                </div>
                <div style={{marginTop:"40px"}}>
                <label forhtml="inputStatus">Video Status </label><br/>
                    
                    <select id="inputStatus" value={status} onChange={e=>setStatus(e.target.value)}>
                            {
                                video_status.map((i, idx)=><option key={idx} value={i.value} >{i.label}</option>)
                            }
                    </select>
                </div>

                <div style={{marginTop:"40px"}}>
                <label forhtml="inputCategory">Category</label> <br/>
                    
                    <select id="inputCategory" value={category} onChange={e=>setCategory(e.target.value)}>
                            {
                                video_category.map((i, idx)=><option key={idx} value={i.value} >{i.label}</option>)
                            }
                    </select>
                </div>
                <div style={{marginTop:"40px"}}>
                <Button type="primary" size="large" >
                Submit
            </Button>
                </div>
            </Form>
        </div>
    )
}

export default UploadVideoPage
