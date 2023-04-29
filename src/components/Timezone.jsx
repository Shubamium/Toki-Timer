import { useEffect, useState } from "react"
import DigitalTime from "./DigitalTimer";
import { dateToTime } from "../utility";

import _ from "lodash";
import LocationSearch from "./LocationSearch";
import LocationList, { Location } from "./LocationList";
import styled from "styled-components";
import axios from "axios";
import moment from "moment-timezone";


import {BiCurrentLocation} from 'react-icons/bi'
import {CgEditBlackPoint} from 'react-icons/cg'
import { useQuery } from "react-query";

const StyledTimezone = styled.div`
  
  /* max-width: 1200px; */
  width: 80vw;
  height: 65vh;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 4em;

  & .tz-content{
    /* display: grid;  */
    /* grid-template-columns: 300px 300px; */
    display: flex;
    justify-content: left;
    white-space: nowrap;
    gap: 1em;
    width:100%;
    max-height: 100%;
  }

  & .wide > div{
    max-height: 100%;
  }

  & .search > div{
    max-height: 100%;
  }

  & > h2{
    font-size:1.5rem;
    color: #534e4fa5;
    font-weight: 400;
  }
`

const StyledLocalLocation = styled.div`
    resize: horizontal;
    overflow: auto;
    height: 58vh;
    background-color: #f7dee9a0;
    padding: 2em;
    border-radius: 10px;
    min-width: 340px;
    font-size: small;
    display: flex;
    flex-direction: column;
    max-width: 500px;

    h2{
        color:var(--black);
    }
    & .local-current{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 50vh;
    }
    & .location{
        /* display: flex; */
        /* flex-direction: column; */
        /* justify-content: center; */
        /* height: 100%; */
    }
    & .location .time{
        font-size: 1.4rem;
    }
    & .location .place-name{
        font-size: 1rem;
    }
    & .coord{
        display: flex;
        justify-content: space-between;

        background-color: #fb87b929;
        margin: .2em;
        padding: .5em 2em;
        text-align:center;
    }
    & .coord h2{
        font-size:1rem;
        /* color: rgb(221, 137, 156); */
        color: rgba(119, 122, 197, 0.584);
        font-weight: normal;
        
    }
    & .coord p{
        opacity: .8;
        color: rgb(148, 102, 161);
    }
`;

export default function Timezone() {
           
    const [currentLocation,setCurrentLocation] = useState();
    const [localLocation,setLocalLocation] = useState({});
    const [savedLocation,setSavedLocation] = useState([]);

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition((pos)=>{
            setCurrentLocation(pos);
            searchLocalPosition(pos.coords.latitude,pos.coords.longitude);
        });
    },[]);
    const today = new Date();


    function handleAddLocation(place){
        const hasBeenAddedBefore = savedLocation.find((val)=> _.isEqual(val.coord,place.coord));

        // If there is no place in the list that has the same exact coordinates
        if(!hasBeenAddedBefore){
            setSavedLocation(prev=>{
                return [...prev,place];
            })
            console.log('added',place);
        }
    }

    // Fetch the API for location coordinate
    async function searchLocalPosition(lat,long){

    
        const url = new URL('https://toki-timer-be.vercel.app/home');
        const coord = lat + ',' + long;
        url.searchParams.append("lat",lat);
        url.searchParams.append("long",long);
        
        // Fetch Data 
        const queryRes = await axios.get(url);
        if(queryRes.status === 200){
            const data = convertToPlaceObj(queryRes.data.data[0]);
            setLocalLocation(data);
            console.log(data);
        }else{
            //Show Error
            setLocalLocation({message:"Couldn't find the local location from the timezone database!"});
        }
    }

    function convertToPlaceObj(place){
        const placeObj = {
            name:place.label,
            coord:{
                lat:place.latitude,
                long:place.longitude
            },
            country:{
                name:place.country,
                region:place.region
            },
            timezone:{
                ...place.timezone_module,
                moment:moment.tz(place.timezone_module.name)
            }

        }
        return placeObj;
    }

    function handleRemoveLocation(name){
        // console.log(name);
        // return;
        setSavedLocation((prev)=>{
            const without = prev.filter((place)=> place.name !== name);
            return without;
        })
    }
    return (
        <StyledTimezone>
            <h2>Timezone</h2>
            <div className="tz-content">
                {currentLocation && (
                        <StyledLocalLocation >
                            <div className="local-current">
                                <h2 style={{opacity:'.8'}}><BiCurrentLocation/> Current Location:</h2>
                                {localLocation.name ? <Location className={'localLocation'} withDate={true} place={localLocation}/> : <p>{localLocation.message}</p>}
                            </div>
                            <div className="local-coords">
                                <h2 style={{opacity:'.5',fontWeight:'normal',textAlign:'center'}}> <CgEditBlackPoint/> Coordinates:</h2>
                                <div className="coord">
                                    <div className="lat">
                                        <h2>Lat</h2>
                                         <p>{currentLocation.coords.latitude}</p>
                                    </div>
                                    <div className="long">
                                        <h2>Long</h2>
                                        <p>{currentLocation.coords.longitude}</p>
                                    </div>
                                </div>
                            </div>
                        </StyledLocalLocation>
                    )}
                <LocationSearch addLocation={handleAddLocation}></LocationSearch>
                <div>
                    <LocationList listOnClick={handleRemoveLocation} list={savedLocation}/>
                </div>
               
            </div>
        </StyledTimezone>
    )
}

// Deprecated
function getLongitudeTime(long){
    const hourDelay = long / 15;
    const minuteDelay = hourDelay * 60;
    const secondDelay = minuteDelay * 60;


    // Convert to miliseconds
    const miliHour = Math.floor(hourDelay) * 60 * 60 ; 
    const miliMinute = Math.floor(minuteDelay) * 60 ;
    const miliSecond = Math.floor(secondDelay);


    const miliDelay = miliHour + miliMinute + miliSecond;
    const stringRes = `${Math.floor(hourDelay)}:${Math.floor(minuteDelay)}:${Math.floor(secondDelay)}`;
    
    const dateNow = new Date();
    const dateLong = new Date(dateNow.getTime() + miliDelay);
    return dateLong;

}