import { useEffect, useState } from "react"
import DigitalTime from "./DigitalTimer"
import moment from "moment-timezone"
import styled from "styled-components"


const StyledLocationList = styled.div`
    padding: 1em;
    & .location-list{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1em;
        padding: 1em;
    }
    & .location-list > div{
        border-bottom: 4px solid #90b4c6;
        background-color: white;
     }

    & .location-list > div:hover{
        scale: 1.02;
        border-bottom: 4px solid #BA90C6;
    }

    & .location_title{
        font-size: 2rem;
        color: #534e4f;
        font-weight: normal;
    }
`
export default function LocationList({list}) {

    function renderLocations(list){
        return list.map((place)=>{
            return <Location place={place}></Location>
        })
    }
    return (
        <StyledLocationList>
            <h2 className="location_title">Saved</h2>
            <div className="location-list">
                    {renderLocations(list)}    
            </div>
        </StyledLocationList>
    )
}

const StyledLocation = styled.div`
    
    box-shadow: 0px 0px 5px #2a29291c;
    padding: 1em;
    text-align: center;
    background-color: #fffffff3;

    & .tz-info{
        background-color: #2a292910;
        color: #505291;
        display: flex;
        justify-content: space-around;
        padding: .5em;
    }
    & .place-name{
        font-size: 1.5rem;
        margin-bottom: 1em;
        font-weight: normal;
        color:#dd899c;
    }

    & .time{
        font-size: 2.5rem;
        font-weight: bold;
    }
    
`
export function Location({place}){
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
        <StyledLocation className="location">
            {initStatus && <DigitalTime className="time">{lmoment.format('h:mm:ss A')}</DigitalTime>}
            
            <h2 className="place-name">{place.name}</h2>
            <div style={{display:'flex',gap:'2em'}} className="tz-info">
                <p>UTC{place.timezone.offset_string}</p>
                <p>{place.timezone.name}</p>
            </div>
        </StyledLocation>
    )
}