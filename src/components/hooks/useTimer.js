import { useEffect } from "react";
import { useRef, useState } from "react";

export default function useTimer(){
    const paused = useRef(false);
    const [isPaused, setIsPaused] = useState(true);
    const interval = useRef(null); 
    
    const [delayUtc,setDelayUtc] = useState(0);
    const startUtc = useRef(); 
    const pausedAt = useRef(); 
    const countdownOrigin = useRef(); 
  

    // Events
    const [onUpdateEvent,setOnUpdate] = useState(()=>{});


    const pauseTimer = () => {
      paused.current = true;
      pausedAt.current = Date.now();
      setIsPaused(true);
    };
    const resetTimer = () => {
        clearInterval(interval.current);
        interval.current = null;
        paused.current = false;
        setIsPaused(true);
        setDelayUtc(0);
    }
  

      
    useEffect(()=>{
      return ()=>{
        resetTimer();
      }
    },[]);
    
    // StopWatch Function
    function startTimer(){
      if(!interval.current){
          startUtc.current = Date.now();
          const intervalId = window.setInterval(countDownMili,45);
          interval.current = intervalId;
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

    
    // Timer Function
    function setTimer(ms){
      resetTimer();
      countdownOrigin.current = ms;
      setDelayUtc(ms);
    }
    function countDown(){
        if(paused.current)return;
        const elapsed = Math.abs(startUtc.current - Date.now());
        onUpdateEvent && onUpdateEvent(delayUtc);
        const result = countdownOrigin.current - elapsed;
        if(result <= 0){
          resetTimer();
          console.log('finished',interval);
          alert('Timer is finished!');
          // clearInterval(interval.current);
          return;
        }
        setDelayUtc(result);
    }
    function startCountdown(){
        if(!interval.current){
          console.log('starting');
          startUtc.current = Date.now();
          const intervalId = window.setInterval(countDown,45);
          interval.current = intervalId
          setIsPaused(false);
        }else{
          const pausedDelay = (Date.now() - pausedAt.current);
          startUtc.current += pausedDelay;
          paused.current = false;
          setIsPaused(false);
        }
    }
    return {elapsed:delayUtc,pauseTimer,resetTimer,startTimer, isPaused,setTimer, startCountdown,setOnUpdate}
   
}