import { NavLink, Outlet } from 'react-router-dom'
import './App.css'
import styled from 'styled-components'


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
  background-color: red;
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
                  <button>Stopwatch</button>
              </NavLink>
              <NavLink to={'/timer'}>
                 <button>Timer</button>
              </NavLink>
              <NavLink to={'/world'}>
                 <button>World Time</button>
              </NavLink>
        </StyledNav>
    </StyledApp>
  )
}



export default App

