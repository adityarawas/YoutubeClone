import React, {useEffect, useState} from 'react'
import axios from 'axios'
const Subscribe = ({userTo, userFrom}) => {
    const [subsNumbers, setSubsNumbers] = useState(0)
    const [issubscriber, setissubscriber] = useState(false)


    const unsubscribetochannel = () =>{
        const writerdetails = {
            userTo:userTo,
            userFrom:userFrom
        }
        axios.post(`/api/subscriber/unsubscribetochannel`,writerdetails)
        .then(resp=>{
            if(resp.status == 200){
                setSubsNumbers(resp.data.subsNumbers)
                setissubscriber(resp.data.isSubs)
            }else{
                
            }
        })
    }
    const subscribetochannel = () =>{
        const writerdetails = {
            userTo:userTo,
            userFrom:userFrom
        }
        axios.post(`/api/subscriber/subscribetochannel`,writerdetails)
        .then(resp=>{
            if(resp.status == 200){
                setissubscriber(true)
            }else{
                
            }
        })
    }

    useEffect(()=>{
        const writerdetails = {
            userTo:userTo,
            userFrom:userFrom
        }
        axios.post(`/api/subscriber/subscriberNumber`,writerdetails)
        .then(resp=>{
            if(resp.status === 200){
                setSubsNumbers(resp.data.subsNumbers)
                setissubscriber(resp.data.isSubs)
            }else{
                alert("Subscribers not found")
            }
        })
    })


    return (
      <div>
          
          {
              issubscriber ?         <button   onClick={unsubscribetochannel} style={{backgroundColor:'#c00',borderRadius:'0px',color:'#fff',padding:'10px 16px', fontWeight: '500', fontSize:'1rem', textTransform:'uppercase', border:'0'}}>
              UnSubscribe <span style={{float:'right', marginLeft:'1rem'}}>{subsNumbers}</span>
          </button>  :
                  <button onClick={subscribetochannel} style={{backgroundColor:'#c00',borderRadius:'0px',color:'#fff',padding:'10px 16px', fontWeight: '500', fontSize:'1rem', textTransform:'uppercase', border:'0'}}>
                  Subscribe <span style={{float:'right', marginLeft:'1rem'}}>{subsNumbers}</span>
              </button>
          }

      </div>

    )
}

export default Subscribe
