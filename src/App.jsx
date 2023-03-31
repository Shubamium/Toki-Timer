import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [time,setTime] = useState(0);
  const paused = useRef(false);
  const [timeObj,setTimeObj] = useState({});
  const [interval,setInterval] = useState(null); 
  useEffect(()=>{
     setTimeObj(secondToTime(time));
  },[time])

  function startTimer(){
      if(!interval){
        const intervalId = window.setInterval(countDown,1000);
        setInterval(intervalId);
      }
  }

  function countDown(){
    if(paused.current)return;
    setTime((prev)=>{
      return prev + 1;
    });
  }
  const pauseTimer = () => {
    console.log(paused.current);
    paused.current = !paused.current;
  };
  return (
    <div className="App">
      <p>{timeToString(timeObj)}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={pauseTimer}>Stop</button>
      <button onClick={countDown}>Reset</button>
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
