import { msToTime, timeToString } from '../utility'
import styled from 'styled-components';
import useTimer from './hooks/useTimer';
import DigitalTime from './DigitalTimer';

export default function Stopwatch() {
    const {elapsed, startTimer,pauseTimer,resetTimer,isPaused} = useTimer();
    const renderTime = (delay)=>{
        const time = msToTime(delay);
        return <DigitalTime className='time'>{timeToString(time)}<span className='ms'>{time.msTrimmed}</span></DigitalTime>
    }
  return (
    <div>
      {renderTime(elapsed)}
      <button onClick={isPaused ? startTimer : pauseTimer}>{isPaused ? 'Start' : 'Pause'}</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  )
}
