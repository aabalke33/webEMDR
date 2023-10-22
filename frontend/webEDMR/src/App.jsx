import React, { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import './index.css'


function ToolBar() {

  const [buttonStyle, setButtonStyle] = useState(1)

  console.log("Counter", buttonStyle)

  return (
    <div className='w-screen h-24 bg-neutral-900 flex justify-center'>
      <div className='h-full flex text-white text-xl font-roboto'>
        <div className='w-48 h-16 bg-neutral-800 hover:bg-neutral-700 transition-colors rounded-full shadow-2xl mr-4 flex justify-center flex-row'>
          <div className='flex flex-row items-center'>
            <h1>Speed &nbsp;</h1>
            <h1>150</h1>
          </div>
        </div>
        <div className='w-16 h-16 bg-neutral-800 hover:bg-neutral-700 transition-colors rounded-full shadow-2xl mr-4'>
          <div className="w-full h-full relative" onClick={() => setButtonStyle (buttonStyle + 1) }>
            <BsPauseFill className={`w-full h-full absolute
              ${ buttonStyle % 2 ? 'opacity-0 rotate-[360deg]' : 'opacity-100' }
              transition-all ease-in-out`}/>
            <BsPlayFill className={`w-full h-full absolute
              ${ buttonStyle % 2 ? 'opacity-100 rotate-[-360deg]' : 'opacity-0' }
              transition-all ease-in-out`}/>
          </div>
        </div>
        <div className='w-48 h-16 bg-neutral-800 hover:bg-neutral-700 transition-colors rounded-full shadow-2xl mr-4 flex justify-center flex-row'>
          <div className='flex flex-row items-center'>
            <h1>Counter &nbsp;</h1>
            <h1>6</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

function Canvas() {
  return(
    <div className='w-screen bg-neutral-900 flex flex-grow items-center'>
      <div className='w-full h-12 top-1/2'>
        <div className='bg-[#5ac0b0] w-12 h-12 fixed rounded-full animate-travel transition-all'></div>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className='w-screen h-screen flex flex-col-reverse select-none'>
      <ToolBar />
      <Canvas />
      <h1 className='absolute bottom-0 text-[#5ac0b0] font-coolvetica text-3xl p-5'>webEDMR</h1>
    </div>    
  )
}

export default App
