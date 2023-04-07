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
                <p>{today.toLocaleString()}</p>
                <p>Location:</p>
                <p>Lat:{currentLocation.coords.latitude}</p>
                <p>Long:{currentLocation.coords.longitude}</p>
            </div>
        )}
    </div>
  )
}
