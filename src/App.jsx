import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import styled from 'styled-components'
import { msToTime, timeToString } from './utility'
import useTimer from './useTimer'


const DigitalTime = styled.p`

  color: #000000;
  font-weight: bold;
  font-family: var(--mainFont);
  font-size: 2rem;
  & .ms{
    font-size: small;
    font-weight: normal;
    color: #272727;
  }
`
function App() {

  const {elapsed, startTimer,pauseTimer,resetTimer,isPaused} = useTimer();
 
  const renderTime = (delay)=>{
    const time = msToTime(delay);
    return <DigitalTime className='time'>{timeToString(time)}<span className='ms'>{time.ms ? time.ms % 100 : '00'}</span></DigitalTime>
  }

  return (
    <div className="App">
      {/* <p>{timeToString(timeObj)}</p> */}
      <p>{renderTime(elapsed)}</p>
      <button onClick={isPaused ? startTimer : pauseTimer}>{isPaused ? 'Start' : 'Pause'}</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  )
}



export default App

