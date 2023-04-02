import { useRef, useState } from "react";

export default function useTimer(){
    const paused = useRef(false);
    const [isPaused, setIsPaused] = useState(true);
    const [interval,setInterval] = useState(null); 
    
    const [delayUtc,setDelayUtc] = useState();
    const startUtc = useRef(); 
    const pausedAt = useRef(); 
    
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
  
    function startTimer(){
      if(!interval){
          startUtc.current = Date.now();
          const intervalId = window.setInterval(countDownMili,45);
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
  
    return {elapsed:delayUtc,pauseTimer,resetTimer,startTimer, isPaused}
   
}