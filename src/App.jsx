import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [time,setTime] = useState(0);
  const [timeObj,setTimeObj] = useState({});
  const [interval,setInterval] = useState(null); 
  useEffect(()=>{
     setTimeObj(secondToTime(time));
  },[time])



  return (
    <div className="App">
      {timeObj && <p>{time}||{timeObj.hours}:{timeObj.minutes}:{timeObj.seconds}</p>}
      <p>{timeToString(timeObj)}</p>
      <button onClick={()=>{setTime((prev) => prev+100)}}>Start</button>
      <button>Stop</button>
      <button>Reset</button>
    </div>
  )
}

function secondToTime(time){
  if(time === 0) return {hours:0,minutes:0,seconds:0};
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor(time / 60) % 60;
  const seconds = time % 60;

  // if(hours === 0) hours = "00";
  // if(minutes === 0) minutes = "00";
  // if(seconds === 0) seconds = "00";
  return {hours,minutes,seconds};
}


function timeToString(timeObj){
  const hours = timeObj.hours === 0 ? "00" : timeObj.hours;
  const minute = timeObj.minutes === 0 ? "00" : timeObj.minutes;
  const string = `${hours + ':'}${minute + ':'}${timeObj.seconds}`;

  return string;
}
export default App
