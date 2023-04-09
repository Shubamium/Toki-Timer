import axios from "axios";
import { useRef, useState } from "react"
import moment from "moment-timezone";
export default function LocationSearch() {


    const searchQuery = useRef();
    const [searchResult,setSearchResult] = useState([]);


    // Fetch the API for location coordinate
    async function searchLocation(e){

        // Validation And Initialization
        e.preventDefault();
        const query = searchQuery.current.value;
        const apiKey = 'e1f5483fcad8a99f2f94b4739460b29f';
        setSearchResult([]);
        if( query === "") return;
        console.log(query);
        
        // Construc the endpoint
        const url = new URL('http://api.positionstack.com/v1/forward')
        url.searchParams.append('access_key',apiKey);
        url.searchParams.append('query',query);
        url.searchParams.append('limit','5');
        url.searchParams.append('output','json');
        url.searchParams.append('timezone_module','1');
        
        
        // Fetch Data 
        const queryRes = await axios.get(url);
        if(queryRes.status === 200){
            console.log(queryRes.data);
            manageSearchResult(queryRes.data.data);
        }else{
            //Show Error
        }
    }

    function manageSearchResult(queryRes){

        if(queryRes.length === 0) return [];
        const result = queryRes.map((place)=>{

            // Place Obj Data Template
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
        });

        console.log(result,'result');
        setSearchResult(result);
    }

    function renderSearchResult(searchResult){
        return searchResult.map((placeObj,index)=>{
                return (
                    <div className="location-res" key={index}>
                        <br />
                        <h2>{placeObj.name}</h2>
                        <p>{placeObj.coord.lat} || {placeObj.coord.long} </p>
                        <div className="timezone">
                            
                            <h3>Timezone</h3>
                            <p>{placeObj.timezone.moment.format('hh:mm:ss DD-MM-YYYY ')}</p>
                            <p>{placeObj.timezone.name}</p>
                            <p>UTC{placeObj.timezone.offset_string}</p>
                        </div>
                    </div>
                )
            });
    }
    return (
        <div>
            <h2>Location Search</h2>
            <form onSubmit={searchLocation}>
                <input type="search" ref={searchQuery} onChange={(e)=>{if(e.target.value === "")setSearchResult([]);}} placeholder="Search a location!" />
                <button type="submit">Search</button>
            </form>

            <div>
                {searchResult && renderSearchResult(searchResult)}
            </div>
        </div>
    )
}
