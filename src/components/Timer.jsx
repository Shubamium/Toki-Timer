import { useEffect } from "react";
import { msToTime, timeToString } from "../utility";
import DigitalTime from "./DigitalTimer";
import useTimer from "./hooks/useTimer"

export default function Timer() {
  const {elapsed, setTimer, startCountdown,isPaused,pauseTimer} = useTimer();
  
  function renderTimer(){
    const timeObj = msToTime(elapsed);
    return (
      <DigitalTime>{timeToString(timeObj)}<span className="ms">{timeObj.msTrimmed}</span></DigitalTime>
    );
  }
  useEffect(()=>{
    setTimer(5000);
  },[])
  return (
    <div>
      <h2>Timer</h2>
      { renderTimer()}
      {isPaused ? 
      (
        <button onClick={startCountdown}>Start</button>
      )
      : (
        <button onClick={pauseTimer}>Pause</button>
      )}
    </div>
  )
}
