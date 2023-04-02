import { msToTime, timeToString } from './utility'
import styled from 'styled-components';
import useTimer from './components/hooks/useTimer';
import DigitalTime from './components/DigitalTimer';

export default function Stopwatch() {
    const {elapsed, startTimer,pauseTimer,resetTimer,isPaused} = useTimer();
    const renderTime = (delay)=>{
        const time = msToTime(delay);
        return <DigitalTime className='time'>{timeToString(time)}<span className='ms'>{time.ms ? time.ms % 100 : '00'}</span></DigitalTime>
    }
  return (
    <div>
      <p>{renderTime(elapsed)}</p>
      <button onClick={isPaused ? startTimer : pauseTimer}>{isPaused ? 'Start' : 'Pause'}</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  )
}
