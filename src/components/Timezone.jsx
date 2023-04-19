import { useEffect, useState } from "react"
import DigitalTime from "./DigitalTimer";
import { dateToTime } from "../utility";

import _ from "lodash";
import LocationSearch from "./LocationSearch";
import LocationList, { Location } from "./LocationList";
import styled from "styled-components";
import axios from "axios";
import moment from "moment-timezone";

const StyledTimezone = styled.div`
    width: 1000px;
`

const StyledLocalLocation = styled.div`
    
    background-color: #e8a0bf;
    padding: 2em;
    width: 100%;
    
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

        // Validation And Initialization
        const apiKey = 'e1f5483fcad8a99f2f94b4739460b29f';
        
        // Construct the endpoint
        const url = new URL('http://api.positionstack.com/v1/reverse')
        url.searchParams.append('access_key',apiKey);
        const coord = lat + ',' + long;
        url.searchParams.append('query',coord);

        url.searchParams.append('limit',1);
        url.searchParams.append('output','json');
        url.searchParams.append('timezone_module','1');
        
        
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

    return (
        <StyledTimezone>
            <h2>Timezone</h2>
            {currentLocation && (
                <StyledLocalLocation>
                    <div className="local-current">
                        <h2>Current Location:</h2>
                        <p>{today.toLocaleDateString()}</p>
                        {localLocation.name ? <Location place={localLocation}/> : <p>{localLocation.message}</p>}
                    </div>
                    <div class="local-coords">
                        <h2>Location:</h2>
                        <p>Lat:{currentLocation.coords.latitude}</p>
                        <p>Long:{currentLocation.coords.longitude}</p>
                    </div>
                </StyledLocalLocation>
            )}
            <LocationList list={savedLocation}/>
            <LocationSearch addLocation={handleAddLocation}></LocationSearch>
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