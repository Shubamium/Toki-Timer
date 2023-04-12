import { useEffect } from "react";
import { msToTime, timeToMs, timeToString } from "../utility";
import DigitalTime from "./DigitalTimer";
import useTimer from "./hooks/useTimer"
import { useRef } from "react";
import styled from "styled-components";
import StyledButton from "./StyledButton";


const StyledTimer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & .title{
    font-size: 2.5rem;
    color: var(--black);
    line-height:  60%;
    font-weight: no;
    opacity: .8;
  }

  & .action{
    display: flex;
    gap:1em;
  }
`
export default function Timer() {
  const {elapsed, setTimer, startCountdown,isPaused,pauseTimer, resetTimer} = useTimer();
  
  const timerAmount = useRef();
  const hoursRef = useRef();
  const minuteRef = useRef();
  const secondRef = useRef();
  function renderTimer(){
    const timeObj = msToTime(elapsed);
    return (
      <DigitalTime size={'5.5rem'} color={timeToMs(timeObj) === 0 ? '#E8A0BF' : '#533d8a9e'} >{timeToString(timeObj)}<span className="ms">{timeObj.msTrimmed}</span></DigitalTime>
    );
  }
  useEffect(()=>{
    // setTimer(5000);

    const secs = timeToMs({
      "hours": 0,
      "minutes": 1,
      "seconds": 60,
      "ms": 0,
      "msTrimmed": "00"
    });

    // console.log(secs);
  },[])

  function setTimerAmount(e){
    e.preventDefault();
    const val = timerAmount.current.value;
    console.log(val);
    setTimer(val);
  }
  function setTimerSpecific(e){
    e.preventDefault();
    let val = {hours:hoursRef.current.value,minutes: minuteRef.current.value,seconds:secondRef.current.value}
    val = timeToMs(val);
    console.log(val);
    setTimer(val);
  }
  return (
    <StyledTimer>
      <h2 className="title">Timer</h2>
      <div className="timer">
          { renderTimer()}
      </div>
      <div className="action">
          {isPaused ? 
          (
            <StyledButton onClick={startCountdown}>Start</StyledButton>
          )
          : (
            <StyledButton onClick={pauseTimer}>Pause</StyledButton>
          )}
          <StyledButton bgColor={'#BA90C6'} onClick={resetTimer}>Set Time</StyledButton>
          <StyledButton bgColor={'#a6cfe5'} onClick={resetTimer}>Reset</StyledButton>
      </div>
      <div className="controls">
        <br />
        <form onSubmit={setTimerAmount}>
            <input type="number" min={0} max={360000} placeholder="miliseconds" ref={timerAmount}/>
            <button type="submit">Set Time</button>
        </form>
        <br />
        <form onSubmit={setTimerSpecific}>
            <input type="number" placeholder={'Hours'} min={0} max={360000} ref={hoursRef}/>
            <input type="number" placeholder={'Minutes'} min={0} max={360000} ref={minuteRef}/>
            <input type="number" placeholder={'Seconds'} min={0} max={360000} ref={secondRef}/>
            <button type="submit">Set Time</button>
        </form>
      </div>
    </StyledTimer>
  )
}
