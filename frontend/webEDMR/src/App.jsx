// Add refactor
// Fix setInterval Lag

import React, { useState, useEffect } from 'react'
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import './index.css'

function MediaControl({play, setPlay}) {

  const [buttonStyle, setButtonStyle] = useState(1)

  return (
    <div className='w-16 h-16 bg-neutral-800 hover:bg-neutral-700 transition-colors rounded-full shadow-3xl mr-4'>
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
    <div onClick={() => setSpeed((speed % 4) + 1)} className='w-48 h-16 bg-neutral-800 hover:bg-neutral-700 transition-colors rounded-full shadow-3xl mr-4 flex justify-center flex-row'>
      <div className='flex flex-row items-center'>
        <h1>Speed &nbsp;</h1>
        <h1>{ speed }s</h1>
      </div>
    </div>
  )
}

function Count({ speed, play }) {

  // Bug: If speed changed without pausing, problems

  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval;

    if (play) {
      interval = setInterval(() => setTime((time + 1) * play), speed * 1000);
    } else {
      setTime(0);
      interval = 0;
    }
    return () => clearInterval(interval);
  }, [time, play, speed]);

  if (play) { return(<h1>{ time }</h1>) }
  else { return(<h1>0</h1>) }
}

function CounterControl({ speed, play }) {
  return(
    <div className='w-48 h-16 bg-neutral-800 transition-colors rounded-full shadow-3xl flex justify-center flex-row'>
      <div className='flex flex-row items-center'>
        <h1>Counter &nbsp;</h1>
        <Count speed={speed} play={play} />
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
        <CounterControl speed={ speed } play={ play } />
      </div>
    </div>
  )
}

function Canvas({ speed, play }) {

  const animate = play ? speed : 0;

  const animationVariants = {
    0: 'left-[calc(50%-24px)] bg-[#5ac0b0] w-12 h-12 fixed rounded-full transition-all',
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
      {/* <div className='absolute w-1/2 h-screen bg-black opacity-50'></div> */}
      <ToolBar setSpeed = { setSpeed } speed={ speed } play={play} setPlay = { setPlay }/>
      <Canvas speed = { speed } play = { play } />
      <h1 className='absolute bottom-0 text-[#5ac0b0] font-coolvetica text-3xl p-5'>webEDMR</h1>
    </div>    
  )
}

export default App
