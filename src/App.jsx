import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const paused = useRef(false);
  const [isPaused, setIsPaused] = useState(true);
  const [interval,setInterval] = useState(null); 
  
  const [delayUtc,setDelayUtc] = useState();
  const startUtc = useRef(); 
  const pausedAt = useRef(); 


  function startTimer(){
    if(!interval){
        startUtc.current = Date.now();
        const intervalId = window.setInterval(countDownMili,40);
        setInterval(intervalId);
        setIsPaused(false);
      }else{

        const pausedDelay = (Date.now() - pausedAt.current);
        startUtc.current += pausedDelay;
        paused.current = false;
        setIsPaused(false);
      }
  }

  function countDownMili(){
      if(paused.current)return;
      setDelayUtc(Date.now() - startUtc.current);
  }
  const pauseTimer = () => {
    paused.current = true;
    pausedAt.current = Date.now();
    setIsPaused(true);

  };
  const resetTimer = () => {
      clearInterval(interval);
      setInterval(null);
      paused.current = false;
      setIsPaused(true);
      setDelayUtc(0);
  }
  
  const renderTime = (delay)=>{
    const time = msToTime(delay);
    return <p className='time'>{timeToString(time)}-<span className='ms'>{time.ms ? time.ms % 100 : '00'}</span></p>
  }
  return (
    <div className="App">
      {/* <p>{timeToString(timeObj)}</p> */}
      <p>{renderTime(delayUtc)}</p>
      <button onClick={isPaused ? startTimer : pauseTimer}>{isPaused ? 'Start' : 'Pause'}</button>
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
  
  const string = `${hours+ ':'}${minute + ':'}${seconds + '.'}${Math.floor(timeObj.ms / 100) || '0'}`;

  return string;
}
export default App
