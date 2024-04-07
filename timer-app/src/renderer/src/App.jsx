import TopBar from './components/TopBar'
import { useState } from 'react'
import Timer from './components/Timer'

function App() {

  const[isOverlay, setIsOverlay] = useState(false)

  return (
    <>
    <TopBar></TopBar>
    <div className='bg-black bg-opacity-40 p-2 rounded-b-xl'>
    <Timer></Timer> 
      </div>
    </>
  )
}

export default App

