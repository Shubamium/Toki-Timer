import { useEffect, useState } from "react"

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
                <p>{today.getTime()}</p>
                <p>Location:</p>
                <p>Lat:{currentLocation.coords.latitude}</p>
                <p>Long:{currentLocation.coords.longitude}</p>
                <p>Time Based On Longitude</p>
                <p>{getLongitudeTime(currentLocation.coords.longitude)}</p>
            </div>
        )}
    </div>
  )
}


function getLongitudeTime(long){
    const hourDelay = long / 15;
    const minuteDelay = (hourDelay - Math.floor(hourDelay)) * 60;
    const secondDelay = (minuteDelay - Math.floor(minuteDelay)) * 60;


    // Convert to miliseconds
    const miliHour = Math.floor(hourDelay) * 60 * 60 * 1000; 
    const miliMinute = Math.floor(minuteDelay) * 60 * 1000;
    const miliSecond = Math.floor(secondDelay) * 1000;


    const miliDelay = miliHour + miliMinute + miliSecond;
    const stringRes = `${Math.floor(hourDelay)}:${Math.floor(minuteDelay)}:${Math.floor(secondDelay)}` ;
    
    const dateNow = new Date();
    const dateLong = new Date(dateNow.getTime() + miliDelay);
    return  dateLong.getTime();

}