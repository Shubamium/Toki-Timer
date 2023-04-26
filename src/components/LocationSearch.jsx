import axios from "axios";
import { useRef, useState } from "react"
import moment from "moment-timezone";
import styled from "styled-components";
import StyledButton from "./StyledButton";
import StyledModalForm from "./StyledModalForm";

import {FaArrowRight} from 'react-icons/fa'
const StyledLocationSearch = styled.div`
    background-color: #b3ddf75f;
    margin: 0 .6em;
    border-radius: 1em;
    padding: 2.4em;
    width:400px;
    display: flex;
    flex-direction: column;
    resize: horizontal;
    overflow: hidden;
    min-width: 350px;
    
    h2{
        opacity: .8;
    }
    & .location-res{
        background-color: #ffffff8c;
        padding: 1em;
        flex-grow: 1;
        border-radius: 1em;
        min-width: fit-content;
        height: fit-content;
    }
    & .location-res p{
        font-size: .7rem;
    }
    & .location-res h2{
        font-size: 1.2rem;
        color: #9466a1;
        font-weight: normal;
    }
    & .location-res button svg{
        margin: .2em .4em;
    }
    & .search-res{
        margin: .2em;
        display: flex;
        justify-content: start;
        flex-wrap: wrap;
        gap: 2em;
        white-space: nowrap;
        overflow:auto;
        padding: .8em;
        padding-bottom: 1.4em;
        box-shadow: 0px 0px 5px #50505042;
        background-color: #7e777a1d;
        max-height: 750px;
        width: fit-content ;
        min-width: 100%;
        height: 100%;
    }
`
export default function LocationSearch({addLocation}) {


    const searchQuery = useRef();
    const [searchResult,setSearchResult] = useState([]);


    // Fetch the API for location coordinate
    async function searchLocation(e){

        // Validation And Initialization
        e.preventDefault();
        const query = searchQuery.current.value;
        setSearchResult([]);
        if( query === "") return;
        console.log(query);
        
        // Construc the endpoint
        const url = new URL('https://toki-timer-be.vercel.app/search');
        url.searchParams.append('name',query);
        
        
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

    function handleAdd(place){
        addLocation(place);
    }
    function renderSearchResult(searchResult){
        return searchResult.map((placeObj,index)=>{
                return (
                    <div className="location-res" key={index}>
                       <div className="location-title">
                            <h2>{placeObj.name}</h2>
                            <hr />
                            <p>{placeObj.coord.lat} & {placeObj.coord.long} </p>
                       </div>
                        <div className="timezone">
                            {/* <h3>Timezone</h3> */}
                            <p>{placeObj.timezone.moment.format('h:m A - D MMMM YYYY ')}</p>
                            <p>{placeObj.timezone.name}</p>
                            <p>UTC{placeObj.timezone.offset_string}</p>
                        </div>
                        <div className="action">
                            <StyledButton size={'.6rem'} onClick={()=>{handleAdd(placeObj)}}>Add  <FaArrowRight/> </StyledButton>
                        </div>
                    </div>
                )
            });
    }
    return (
        <StyledLocationSearch>
            <h2>Location Search</h2>
            <StyledModalForm onSubmit={searchLocation}>
                <div className="stack">
                    <input type="search" ref={searchQuery} onChange={(e)=>{if(e.target.value === "")setSearchResult([]);}} placeholder="Search a location!" />
                    <StyledButton type="submit" style={{height:'fit-content',alignSelf:'center'}}>Search</StyledButton>
                </div>
            </StyledModalForm>

            <div className="search-res">
                {searchResult && renderSearchResult(searchResult)}
            </div>
        </StyledLocationSearch>
    )
}
