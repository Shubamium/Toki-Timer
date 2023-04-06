import { useEffect, useState } from "react"

export default function Timezone() {

    const [currentLocation,setCurrentLocation] = useState();
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition((pos)=>{
            setCurrentLocation(pos);
        });
    
    },[]);
  return (
    <div>
        Timezone
        {currentLocation && (
            <div>
                <p>Current Location:</p>
                <p>Lat:{currentLocation.coords.latitude}</p>
                <p>Long:{currentLocation.coords.longitude}</p>
            </div>
        )}
    </div>
  )
}
