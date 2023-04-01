import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [time,setTime] = useState(0);
  const paused = useRef(false);
  const [timeObj,setTimeObj] = useState({});
  const [interval,setInterval] = useState(null); 
  
  const [delayUtc,setDelayUtc] = useState();
  const startUtc = useRef(); 
  const pausedAt = useRef(); 

  useEffect(()=>{
     setTimeObj(secondToTime(time));
  },[time])

  function startTimer(){
    if(!interval){
        startUtc.current = Date.now();
        const intervalId = window.setInterval(countDownMili,20);
        console.log(Date.now());
        setInterval(intervalId);
      }else{

        const pausedDelay = (Date.now() - pausedAt.current);
        startUtc.current += pausedDelay;
        console.log(startUtc.current,pausedDelay,'current')
        paused.current = false;
      }
  }



  function countDownMili(){
      if(paused.current)return;
      setDelayUtc(Date.now() - startUtc.current);
  }
  function countDown(){
    if(paused.current)return;
    setTime((prev)=>{
      return prev + 1;
    });
  }
  const pauseTimer = () => {
    paused.current = true;
    pausedAt.current = Date.now();
  };

  const resetTimer = () => {
      clearInterval(interval);
      setInterval(null);
      setTime(0);
      paused.current = false;
  }
  return (
    <div className="App">
      {/* <p>{timeToString(timeObj)}</p> */}
      <p>{timeToString(msToTime(delayUtc))}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={pauseTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  )
}

function secondToTime(time){
  if(time === 0) return {hours:0,minutes:0,seconds:0};
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor(time / 60) % 60;
  const seconds = Math.floor(time % 60);

  // if(hours === 0) hours = "00";
  // if(minutes === 0) minutes = "00";
  // if(seconds === 0) seconds = "00";
  return {hours,minutes,seconds};
}

function msToTime(ms){
  if(ms === 0) return {hours:0,minutes:0,seconds:0};
  const time = ms/1000;
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor(time / 60) % 60;
  const seconds = Math.floor(time % 60);
  const mili = ms % 1000;
  // if(hours === 0) hours = "00";
  // if(minutes === 0) minutes = "00";
  // if(seconds === 0) seconds = "00";
  return {hours,minutes,seconds,ms:mili};
}


function timeToString(timeObj){
  const addZero = (time)=>{
    if(!time)return null;
    const newTime = time.toString();
    return newTime.split('').length > 1 ? newTime : '0' + newTime;
  }

  const hours = addZero(timeObj.hours) || '00';
  const minute = addZero(timeObj.minutes) || '00';
  const seconds =  addZero(timeObj.seconds) || '00';
  
  const string = `${hours+ ':'}${minute + ':'}${seconds}`;

  return string;
}
export default App
