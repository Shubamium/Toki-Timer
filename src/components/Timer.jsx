import { useEffect } from "react";
import { msToTime, timeToMs, timeToString } from "../utility";
import DigitalTime from "./DigitalTimer";
import useTimer from "./hooks/useTimer"
import { useRef } from "react";
import styled from "styled-components";
import StyledButton from "./StyledButton";
import ReactModal from "react-modal";
import { useState } from "react";
import { AiFillCloseSquare} from 'react-icons/ai'
import { CgTimelapse} from 'react-icons/cg'

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

const StyledModal = styled(ReactModal)`
      max-width: 80%;
      max-height: 80%;
      position: absolute;
      top: 50%;
      left:50%;
`
const ModalStyling = styled.div`
  & .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.2rem;
    color: #857584;
  }
  & .header .close-btn{
    font-size: 2rem;
    background:none;
    border: none;
    color: #BA90C6;
    box-shadow: none;
    margin: 0%;
    padding: 0;

  }
`
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    backgroundColor:'#FDF4F5',
    transform: 'translate(-50%, -50%)',
    opacity:'1',
    border:'2px white',
    padding:'4em 2em',
    paddingTop:'1em',
    boxShadow:'1px 2px 2px  #8c858541'
  },
  overlay:{
    opacity:'1'
  }
};

export default function Timer() {
  const {elapsed, setTimer, startCountdown,isPaused,pauseTimer, resetTimer} = useTimer();
  const [modalOpen, setModalOpen] = useState(false);
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
    setModalOpen(false);
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
          <StyledButton bgColor={'#BA90C6'} onClick={()=>{setModalOpen(true)}}>Set Time</StyledButton>
          <StyledButton bgColor={'#a6cfe5'} onClick={resetTimer}>Reset</StyledButton>
      </div>

      <ReactModal style={customStyles} isOpen={modalOpen}>
            <ModalStyling>
              <div className="header">
                  <h2><CgTimelapse style={{position:'relative',top:'4px'}}/> Set Time</h2>  
                  <StyledButton onClick={()=>{setModalOpen(false)}} className="close-btn"><AiFillCloseSquare /></StyledButton>
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
            </ModalStyling>
      </ReactModal>
    </StyledTimer>
  )
}
