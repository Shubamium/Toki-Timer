import { NavLink, Outlet } from 'react-router-dom'
import './App.css'
import styled from 'styled-components'
import StyledButton from './components/StyledButton'


// Main Styling
const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  & .left{
    display: flex;
    align-items: center;
    gap: 1em;
  }
  & .left .detail{
    font-weight: lighter;
  }
` 

// Header
const StyledHeader = styled.header`
  display: flex;
  background-color: #c0dbea1f;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  position:absolute;
  top:5%;
  width: min(80vw,1700px);
`

const StyledNav = styled.nav`
  position: absolute;
  bottom: 5%;
  display: flex;
  gap: 1em;

  
  & a.active button{
    background-color: #E8A0BF;
    color: white;
  }
  & a button{
    background-color : transparent;
    border: 2px solid #BA90C6;
    color: #BA90C6;
  }

  & a:hover button{
    /* --bgColor: #E8A0BF; */
    animation: buttonHover 500ms forwards;
    color: white;
    font-weight:bold;
    box-shadow: 4px 4px 6px  #50445033;
  }

  @keyframes buttonHover {
      from{
        background: linear-gradient(50deg, #E8A0BF 0%, #E8A0BF 10%, transparent 11%);
        background-position: -100% -100%;
        background-origin: center;
        background-repeat: no-repeat;
        color: #E8A0BF;
      }
      50%{
        background-position: 1000% 1000%;
        background-repeat: no-repeat;
        background: linear-gradient(50deg, #E8A0BF 0%, #E8A0BF 50%, transparent 51%);
        color: #7854a2;
      }
      to{
        background-position: 1000% 1000%;
        background-repeat: no-repeat;
        background: linear-gradient(50deg, #E8A0BF 0%, #E8A0BF 99%, transparent 100%);
        color: white;
      }
  }
`
function App() {

  function requestFullScreen() {

    const elem = document.documentElement;
    if(document.fullscreenElement){
        if (document.exitFullscreen) {
          document.exitFullscreen(); // standard
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen(); // Safari, Chrome and Opera
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen(); // Firefox
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen(); // IE/Edge
        }
    }else{
      if (elem.requestFullscreen) { 
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
      }
    }
  }

  return (
    <StyledApp className="App">
        <StyledHeader>
             <div className="left">
                 <h1 className='title'><span className='logo'>トキ</span> Timer App</h1> 
                 <p className='detail'>Website By <b>Shubamium</b></p>
             </div>
             <div className="right">
                  <button onClick={requestFullScreen}>Fullscreen</button>
             </div>
        </StyledHeader>
        <div className='content'>
          <Outlet></Outlet>
        </div>
        <StyledNav className='navigation'>
              <NavLink to={'/'}>
                  <StyledButton >Stopwatch</StyledButton>
              </NavLink>
              <NavLink to={'/timer'}>
                 <StyledButton >Timer</StyledButton>
              </NavLink>
              <NavLink to={'/world'}>
                 <StyledButton>World Time</StyledButton>
              </NavLink>
        </StyledNav>
    </StyledApp>
  )
}



export default App

