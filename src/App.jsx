import { NavLink, Outlet } from 'react-router-dom'
import './App.css'
import Timer from './Stopwatch'



function App() {

  return (
    <div className="App">
        <h2>Toki Timer App</h2> 
        <Outlet></Outlet>
        <div>
          <NavLink to={'/'}>Stopwatch</NavLink>
          <NavLink to={'/timer'}>Timer</NavLink>
          <NavLink to={'/world'}>World Time</NavLink>
        </div>
    </div>
  )
}



export default App

