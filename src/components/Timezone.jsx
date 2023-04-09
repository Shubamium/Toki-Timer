import { useEffect, useState } from "react"
import DigitalTime from "./DigitalTimer";
import { dateToTime } from "../utility";
import LocationSearch from "./LocationSearch";
export default function Timezone() {
           
    const [currentLocation,setCurrentLocation] = useState();
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition((pos)=>{
            setCurrentLocation(pos);
        });
    },[]);
    const today = new Date();
  return (
    <div>
        Timezone
        {currentLocation && (
            <div>
                <h2>Current Location:</h2>
                <p>Your time:</p>
                <p>{today.getTime()+ " and " + today.toLocaleString()}</p>
                <h2>Location:</h2>
                <p>Lat:{currentLocation.coords.latitude}</p>
                <p>Long:{currentLocation.coords.longitude}</p>
                {/* <p>Time Based On Longitude</p> */}
                {/* <DigitalTime/> */}
                {/* <p>{getLongitudeTime(currentLocation.coords.longitude).toString()}</p> */}
                <LocationSearch></LocationSearch>
            </div>
        )}
        

    </div>
  )
}


function getLongitudeTime(long){
    const hourDelay = long / 15;
    const minuteDelay = hourDelay * 60;
    const secondDelay = minuteDelay * 60;


    // Convert to miliseconds
    const miliHour = Math.floor(hourDelay) * 60 * 60 ; 
    const miliMinute = Math.floor(minuteDelay) * 60 ;
    const miliSecond = Math.floor(secondDelay);


    const miliDelay = miliHour + miliMinute + miliSecond;
    const stringRes = `${Math.floor(hourDelay)}:${Math.floor(minuteDelay)}:${Math.floor(secondDelay)}` ;
    
    const dateNow = new Date();
    const dateLong = new Date(dateNow.getTime() + miliDelay);
    return dateLong;

}