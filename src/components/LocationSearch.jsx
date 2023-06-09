import axios from "axios";
import { useRef, useState } from "react";
import moment from "moment-timezone";
import styled from "styled-components";
import StyledButton from "./StyledButton";
import StyledModalForm from "./StyledModalForm";

import {
  FaArrowRight,
  FaLocationArrow,
  FaSearchLocation,
} from "react-icons/fa";
import { TiLocation } from "react-icons/ti";
import { useQuery } from "react-query";

const StyledLocationSearch = styled.div`
  background-color: #b3ddf75f;
  margin: 0 0.6em;
  border-radius: 1em;
  padding: 2.4em;
  width: 400px;
  display: flex;
  flex-direction: column;
  resize: horizontal;
  overflow: hidden;
  min-width: 350px;
  height: 58vh;

  h2 {
    opacity: 0.8;
  }
  & .location-res {
    background-color: #ffffff8c;
    padding: 1em;
    flex-grow: 1;
    border-radius: 1em;
    min-width: fit-content;
    height: fit-content;
    max-width: 100%;
    box-shadow: 0px 2px 4px #757ce74e;
    transition: box-shadow 250ms ease;
  }
  & .location-res:hover {
    box-shadow: 0px 4px 4px #5056a352;
  }

  input {
    border-radius: 10px;
  }
  & .location-res p {
    font-size: 0.7rem;
  }
  & .location-res hr {
    opacity: 0.4;
    color: #9466a1;
    margin: 0.21em 0;
  }
  & .location-res h2 {
    font-size: 1.2rem;
    color: #9466a1;
    font-weight: normal;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 250px; /* adjust to your desired length */
  }
  .truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 300px; /* adjust to your desired length */
  }

  & .location-res button {
    margin-block: 1em;
    vertical-align: baseline;
    display: flex;
    align-items: center;
  }

  & .location-res .action {
    display: flex;
    justify-content: flex-end;
  }
  & .location-res button svg {
    margin: 0.4em 0.4em;
  }

  & .location-res .detail_coord {
    background-color: #8383ca2a;
    padding: 0.2em;
    text-align: center;
    color: #3a3a3aae;
  }

  & .location-res .detail_timezone {
    background-color: #c5c5e32a;
    padding: 0.2em;
    text-align: center;
    display: flex;
    justify-content: space-around;
    border-radius: 5px;
    padding: 1em;
    color: #be6262c0;
    font-size: 0.5rem;
    flex-wrap: wrap;
  }
  & .location-res .detail_date {
    padding: 0.2em;
    text-align: center;
    color: #3a3a3a93;
    font-size: rem;
  }
  & .search-res {
    margin: 0.2em;
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    gap: 2em;
    white-space: nowrap;
    overflow: auto;
    padding: 0.8em;
    padding-bottom: 1.4em;
    box-shadow: 0px 0px 5px #50505042;
    background-color: #7e777a1d;
    max-height: 750px;
    width: fit-content;
    min-width: 100%;
    height: 100%;
  }
`;
export default function LocationSearch({ addLocation }) {
  const searchQuery = useRef();
  const [searchResult, setSearchResult] = useState([]);

  const [searchParam, setSearchParam] = useState("");
  const { isLoading, refetch, isError, error } = useQuery(
    ["searchRes", searchParam],
    fetchLocation,
    { enabled: false, onSuccess: (data) => manageSearchResult(data.data) }
  );

  // Fetch the API for location coordinate
  async function searchLocation(e) {
    // Validation And Initialization
    e.preventDefault();
    const query = searchQuery.current.value;
    setSearchResult([]);
    if (query === "") return;
    await setSearchParam(query);
    refetch();
    // if(queryRes.status === 200){
    //     console.log(queryRes.data);
    //     // manageSearchResult(queryRes.data.data);
    // }else{
    //     //Show Error
    // }
  }
  async function fetchLocation(queryKey, id) {
    // console.log('ID:',id);
    console.log("QK:", queryKey.queryKey[1]);
    // Construc the endpoint
    const url = new URL("https://toki-timer-be.vercel.app/search");
    url.searchParams.append("name", searchParam);
    const queryRes = await axios.get(url);
    return queryRes.data;
  }

  function manageSearchResult(queryRes) {
    if (queryRes.length === 0) return [];
    const result = queryRes.map((place) => {
      // Place Obj Data Template
      const placeObj = {
        name: place.label,
        coord: {
          lat: place.latitude,
          long: place.longitude,
        },
        country: {
          name: place.country,
          region: place.region,
        },
        timezone: {
          ...place.timezone_module,
          moment: moment.tz(place.timezone_module.name),
        },
      };

      return placeObj;
    });

    // console.log(result,'result');
    setSearchResult(result);
  }

  function handleAdd(place) {
    addLocation(place);
  }
  function renderSearchResult(searchResult) {
    return searchResult.map((placeObj, index) => {
      return (
        <div className="location-res" key={index}>
          <div className="location-title">
            <h2>{placeObj.name}</h2>
            <hr />
          </div>
          <div className="timezone">
            <p className="detail_coord">
              {placeObj.coord.lat} & {placeObj.coord.long}{" "}
            </p>
            <p className="detail_date">
              {placeObj.timezone.moment.format("h:m A - D MMMM YYYY ")}
            </p>
            {/* <h3>Timezone</h3> */}
            <div className="detail_timezone">
              <p>{placeObj.timezone.name}</p>
              <p>UTC{placeObj.timezone.offset_string}</p>
            </div>
          </div>
          <div className="action">
            <StyledButton
              size={".7rem"}
              onClick={() => {
                handleAdd(placeObj);
              }}
            >
              Add <FaArrowRight />{" "}
            </StyledButton>
          </div>
        </div>
      );
    });
  }
  return (
    <StyledLocationSearch>
      <h2>
        {" "}
        <TiLocation /> Location Search
      </h2>
      <StyledModalForm onSubmit={searchLocation}>
        <div className="stack">
          <input
            type="search"
            ref={searchQuery}
            onChange={(e) => {
              if (e.target.value === "") setSearchResult([]);
            }}
            placeholder="Search a location!"
          />
          <StyledButton
            type="submit"
            style={{ height: "fit-content", alignSelf: "center" }}
          >
            <FaSearchLocation />
          </StyledButton>
        </div>
      </StyledModalForm>

      <div className="search-res">
        {isLoading && (
          <>
            <p style={{ opacity: ".5" }}>Finding Location . . .</p>
          </>
        )}

        {isError && <p>{error}</p>}
        {searchResult && renderSearchResult(searchResult)}
      </div>
    </StyledLocationSearch>
  );
}
