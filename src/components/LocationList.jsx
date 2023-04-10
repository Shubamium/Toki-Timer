import { useEffect, useState } from "react"
import DigitalTime from "./DigitalTimer"
import moment from "moment-timezone"


export default function LocationList({list}) {

    function renderLocations(list){
        return list.map((place)=>{
            return <Location place={place}></Location>
        })
    }
    return (
        <div>
            <h2>Saved</h2>
            {renderLocations(list)}    
        </div>
    )
}


function Location({place}){
    // RealTime MomentJS
    const [lmoment,setLMoment] = useState(moment('00:00:00','HH:mm:ss'));
    const [initStatus,setInitStatus] = useState(false);
    useEffect(()=>{
        const interval = setInterval(()=>{
            setLMoment(moment.tz(place.timezone.name));
            setInitStatus(true);
        },1000)

        return ()=>{
            clearInterval(interval);
        }
    },[place]);

    return(
        <div>
            {initStatus && <DigitalTime>{lmoment.format('h:mm:ss A')}</DigitalTime>}
            
            <h2>{place.name}</h2>
            <div style={{display:'flex',gap:'2em'}}>
                <p>UTC{place.timezone.offset_string}</p>
                <p>{place.timezone.name}</p>
            </div>
        </div>
    )
}