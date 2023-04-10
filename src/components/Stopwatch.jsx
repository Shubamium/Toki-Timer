import { msToTime, timeToString } from '../utility'
import styled from 'styled-components';
import useTimer from './hooks/useTimer';
import DigitalTime from './DigitalTimer';
import StyledButton from './StyledButton';


const StyledStopwatch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1em;
  & .title{
    font-size: 2rem;
    margin: .4em;
    opacity: 0.7;
  }

  & .time{
    line-height: 70%;
  }
  & .action{
    display: flex;
    gap: 1em;
  }
`

export default function Stopwatch() {
    const {elapsed, startTimer,pauseTimer,resetTimer,isPaused} = useTimer();
    const renderTime = (delay)=>{
        const time = msToTime(delay);
        return <DigitalTime className='time' color='#533d8a9e' size={'5rem'}>{timeToString(time)}<span className='ms'>{time.msTrimmed}</span></DigitalTime>
    }

    
  return (
    <StyledStopwatch>
      <h2 className='title'>Stopwatch</h2>
      <div>
        {renderTime(elapsed)}
      </div>
      <div className='action'>
        <StyledButton onClick={isPaused ? startTimer : pauseTimer}>{isPaused ? 'Start' : 'Pause'}</StyledButton>
        <StyledButton bgColor={'#a6cfe5'} onClick={resetTimer}>Reset</StyledButton>
      </div>
    </StyledStopwatch>
  )
}
