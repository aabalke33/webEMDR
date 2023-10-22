// Get Counter to Work, Add Favicon, refactor, Add scroll capability for speed, hide menu unless movement


import React, { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import './index.css'


function MediaControl({play, setPlay}) {

  const [buttonStyle, setButtonStyle] = useState(1)

  return (
    <div className='w-16 h-16 bg-neutral-800 hover:bg-neutral-700 transition-colors rounded-full shadow-2xl mr-4'>
      <div className="w-full h-full relative"
        onClick={() => {
          setButtonStyle(buttonStyle + 1);
          setPlay((play + 1) % 2)
          }}>
        <BsPauseFill className={`w-full h-full absolute
          ${ buttonStyle % 2 ? 'opacity-0 rotate-[360deg]' : 'opacity-100' }
          transition-all ease-in-out`}/>
        <BsPlayFill className={`w-full h-full absolute
          ${ buttonStyle % 2 ? 'opacity-100 rotate-[-360deg]' : 'opacity-0' }
          transition-all ease-in-out`}/>
      </div>
    </div>
  )
}

function SpeedControl({ speed, setSpeed }) {

  return(
    <div onClick={() => setSpeed((speed % 4) + 1)} className='w-48 h-16 bg-neutral-800 hover:bg-neutral-700 transition-colors rounded-full shadow-2xl mr-4 flex justify-center flex-row'>
      <div className='flex flex-row items-center'>
        <h1>Speed &nbsp;</h1>
        <h1>{ speed }s</h1>
      </div>
    </div>
  )
}

function CounterControl() {
  return(
    <div className='w-48 h-16 bg-neutral-800 hover:bg-neutral-700 transition-colors rounded-full shadow-2xl mr-4 flex justify-center flex-row'>
      <div className='flex flex-row items-center'>
        <h1>Counter &nbsp;</h1>
        <h1>6</h1>
      </div>
    </div>
  )
}

function ToolBar({speed, setSpeed, play, setPlay }) {
  return (
    <div className='w-screen h-24 bg-neutral-900 flex justify-center'>
      <div className='h-full flex text-white text-xl font-roboto'>
        <SpeedControl speed={ speed } setSpeed={ setSpeed }/>
        <MediaControl play = { play } setPlay={ setPlay }/>
        <CounterControl />
      </div>
    </div>
  )
}

function Canvas({ speed, play }) {

  const animate = play ? speed : 0;

  const animationVariants = {
    0: 'left-[calc(50%-48px)] bg-[#5ac0b0] w-12 h-12 fixed rounded-full transition-all',
    1: 'animate-[travel_1s_linear_infinite] bg-[#5ac0b0] w-12 h-12 fixed rounded-full transition-all',
    2: 'animate-[travel_2s_linear_infinite] bg-[#5ac0b0] w-12 h-12 fixed rounded-full transition-all',
    3: 'animate-[travel_3s_linear_infinite] bg-[#5ac0b0] w-12 h-12 fixed rounded-full transition-all',
    4: 'animate-[travel_4s_linear_infinite] bg-[#5ac0b0] w-12 h-12 fixed rounded-full transition-all'
  }

  return(
    <div className='w-screen bg-neutral-900 flex flex-grow items-center'>
      <div className='w-full h-12 top-1/2'>
        <div className={`${animationVariants[animate]}`}></div>
      </div>
    </div>
  )
}

function App() {

  const [speed, setSpeed] = useState(2)
  const [play, setPlay] = useState(0)

  return (
    <div className='w-screen h-screen flex flex-col-reverse select-none'>
      <ToolBar setSpeed = { setSpeed } speed={ speed } play={play} setPlay = { setPlay }/>
      <Canvas speed = { speed } play = { play } />
      <h1 className='absolute bottom-0 text-[#5ac0b0] font-coolvetica text-3xl p-5'>webEDMR</h1>
    </div>    
  )
}

export default App
