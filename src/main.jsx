import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Timer from './components/Timer'
import './index.css'
import Stopwatch from './Stopwatch'


const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        index:true,
        element:<Stopwatch/>
      },
      {
        path:'timer',
        element:<Timer/>
      },
      {
        path:'world'
      }
    ]
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>      
    </RouterProvider>
  </React.StrictMode>,
)
