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
import StyledModalForm from "./StyledModalForm";
import useTitleChanger from "./hooks/useTitleChanger";


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

  & .control-switcher h3{
    font-size: 1rem;
    color: #857584;
    font-weight: normal;
  }

  & .control-switcher{
    padding-bottom: 2.5em;
  }
  & .control-switcher select{
      padding: .5em;
      width: 100%;
      /* margin: .4em 0; */
      background-color: #ffffffdb;
      border: none;
      border-bottom:2px solid #C0DBEA;
      outline: none;
      transition: all 250ms ease;
      color: #857584;
      border-radius: 5px;
      font-size: 1rem;
      box-shadow: 0px 0px 4px #8575842b;

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
    boxShadow:'1px 2px 2px  #8c858541',
    minWidth:'300px',
  },
  overlay:{
    opacity:'1'
  }
};


// Dropdown choose over what type of time
// Show which form depending on that
export default function Timer() {
  const {elapsed, setTimer, startCountdown,isPaused,pauseTimer, resetTimer, setOnUpdate} = useTimer();
  const [modalOpen, setModalOpen] = useState(false);
  const timerAmount = useRef();
  const hoursRef = useRef();
  const minuteRef = useRef();
  const secondRef = useRef();
  const elapsedRef = useRef();

  // const {setTitle,resetTitle} = useTitleChanger();

  useEffect(()=>{
    elapsedRef.current = elapsed;
  },[elapsed])
  const [metricControl,setMetric] =  useState('time');
  function renderTimer(){
    const timeObj = msToTime(elapsed);
    return (
      <DigitalTime size={'5.5rem'} color={timeToMs(timeObj) === 0 ? '#E8A0BF' : '#533d8a9e'} >{timeToString(timeObj)}<span className="ms">{timeObj.msTrimmed}</span></DigitalTime>
    );
  }
  
  useEffect(()=>{
    // setTimer(5000);
   
    // let timerInterval = 0; 
    // timerInterval =  setInterval(()=>{
    //   const timeObj = msToTime(elapsedRef.current);
    //   document.title = timeToString(timeObj);
    // },100)
    

    // const secs = timeToMs({
    //   "hours": 0,
    //   "minutes": 1,
    //   "seconds": 60,
    //   "ms": 0,
    //   "msTrimmed": "00"
    // });

    // return () =>{
    //   clearInterval(timerInterval);
    // }
  },[])

  function setTimerAmount(e){
    e.preventDefault();
    const val = timerAmount.current.value;
    console.log(val);
    setTimer(val);
    setModalOpen(false);
  }
  function setTimerSpecific(e){
    e.preventDefault();
    let val = {hours:hoursRef.current.value,minutes: minuteRef.current.value,seconds:secondRef.current.value}
    val = timeToMs(val);
    console.log(val);
    setTimer(val);
    setModalOpen(false);
  }

  const metricSetterForms = {
    time:
      <StyledModalForm onSubmit={setTimerSpecific}>
        <div className="stack">
          <div>
            <p>Hours</p>
            <input type="number" placeholder={'Hours'} min={0} max={99} maxLength="3" ref={hoursRef}/>
          </div>
          <div>
            <p>Minutes</p>
            <input type="number" placeholder={'Minutes'} min={0} max={36000} maxLength="3" ref={minuteRef}/>
          </div>
          <div>
            <p>Seconds</p>
            <input type="number" placeholder={'Seconds'} min={0} max={360000} maxLength="3" ref={secondRef}/>
          </div>
        </div>
        <div className="stack">
          <StyledButton style={{marginBlock:'.4em'}} type="submit">Apply</StyledButton>
        </div>
      </StyledModalForm>
    ,
    milliseconds:(
      <StyledModalForm onSubmit={setTimerAmount}>
        <input type="number" min={0} max={360000} placeholder="miliseconds" ref={timerAmount}/>
        <div className="stack">
            <StyledButton style={{marginBlock:'.4em'}} type="submit">Apply</StyledButton>
        </div>
      </StyledModalForm>
    )
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
              <div className="control-switcher">
                <h3>Metric</h3>
                <select name="metric" id="metric" onChange={(e)=>setMetric(e.target.value)}>
                    <option value="time" defaultChecked>Time</option>
                    <option value="milliseconds">Millisecond</option>
                </select>
              </div>
              <div className="controls">
                {metricSetterForms[metricControl] || <p>ERROR: Metric Not Found Or Hasn't Been Implemented Yet </p>}
              </div>
            </ModalStyling>
      </ReactModal>
    </StyledTimer>
  )
}
