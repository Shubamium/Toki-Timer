import { useEffect, useState } from "react"
import DigitalTime from "./DigitalTimer"
import moment from "moment-timezone"
import styled from "styled-components"

import {RiMapPinTimeFill} from 'react-icons/ri'

const StyledLocationList = styled.div`
    padding: .2em;
    overflow: auto;
    white-space: nowrap;
    max-height: 60vh;
   
    & .location-list{
        /* grid-template-rows: 1fr 1fr; */
        display: flex;
        flex-wrap: wrap;
        gap: 1em;
        padding: 1em;
        /* width: 5500px;  */
        width: 100%;
        min-width: 400px;
        
        resize: horizontal;
        
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

    & .location .time{
        font-size: 1.3rem;
    }
    & .location .place-name{
        font-size: 1rem;
    }
    & .location .tz-info{
        font-size: .8rem;
    }
`
export default function LocationList({list, listOnClick}) {

    function renderLocations(list){
        return list.map((place,index)=>{
            return <Location onClick={listOnClick} key={index} place={place}></Location>
        })
    }
    return (
        <StyledLocationList>
            <h2 className="location_title"><RiMapPinTimeFill/> Saved</h2>
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
        color: #7779c5;
        display: flex;
        justify-content: space-around;
        padding: .5em;
        margin-top: 1em;
    }
    & .place-name{
        font-size: 1.5rem;
        /* margin-bottom: 1em; */
        font-weight: normal;
        color:#dd899c;
    }

    & .time{
        font-size: 2.5rem;
        font-weight: bold;
    }

    & .date{
        opacity: .6;
    }
    
`
export function Location({place,withDate,onClick}){
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
        <StyledLocation className="location" onClick={()=>{onClick(place.name)}}>
            {initStatus && <DigitalTime className="time">{lmoment.format('h:mm:ss A')}</DigitalTime>}
            
            <h2 className="place-name">{place.name}</h2>
            {withDate && <p className="date">{lmoment.format('h MMMM YYYY')}</p>}
            <div style={{display:'flex',gap:'2em'}} className="tz-info">
                <p>UTC{place.timezone.offset_string}</p>
                <p>{place.timezone.name}</p>
            </div>
        </StyledLocation>
    )
}