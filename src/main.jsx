import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Timer from './components/Timer'
import './index.css'
import Stopwatch from './components/Stopwatch'
import Timezone from './components/Timezone'
import { QueryClient, QueryClientProvider } from 'react-query'

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
        path:'world',
        element:<Timezone/>
      }
    ]
  },

]);


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>      
      </RouterProvider> 
    </QueryClientProvider>
  </React.StrictMode>,
)
