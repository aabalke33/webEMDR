import React, { useState, useEffect } from 'react'
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import './index.css'

function MediaControl({play, setPlay, buttonStyle, setButtonStyle }) {
  return (
    <div className='w-16 h-16 bg-neutral-800 hover:bg-neutral-700 transition-colors rounded-full shadow-3xl mr-4'>
      <div className="w-full h-full relative"
        onClick={() => {
          setButtonStyle((buttonStyle + 1) % 2);
          setPlay((play + 1) % 2)
        }}>
        <BsPauseFill className={`w-full h-full absolute
          ${ buttonStyle ? 'opacity-0 rotate-[360deg]' : 'opacity-100' }
          transition-all ease-in-out`}/>
        <BsPlayFill className={`w-full h-full absolute
          ${ buttonStyle ? 'opacity-100 rotate-[-360deg]' : 'opacity-0' }
          transition-all ease-in-out`}/>
      </div>
    </div>
  )
}

function SpeedControl({ speed, setSpeed }) {
  return (
    <div onClick={() => setSpeed((speed % 4) + 1)} className='w-48 h-16 bg-neutral-800 hover:bg-neutral-700 transition-colors rounded-full shadow-3xl mr-4 flex justify-center flex-row'>
      <div className='flex flex-row items-center'>
        <h1>Speed &nbsp;</h1>
        <h1>{ speed }s</h1>
      </div>
    </div>
  )
}

function Count({ speed, play }) {

  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState(0);

  const audioLeft = new Audio('./left.mp3')
  const audioRight = new Audio('./right.mp3')

  function now() { return ((new Date()).getTime()) }

  function playSound(startTime, speed) {

    const variance = 5 + (speed * 1)
    const elapse = (now() - startTime) % (speed * 1000)
    const leftFloor = (speed * 250) - variance 
    const leftCeil = (speed * 250) + variance
    const rightFloor = (speed * 750) - variance 
    const rightCeil = (speed * 750) + variance
    const locationLeft = (leftFloor < elapse && elapse < leftCeil)
    const locationRight = (rightFloor < elapse && elapse < rightCeil)

    if (locationLeft) { audioLeft.play() }
    if (locationRight) { audioRight.play() }
  }

  useEffect(() => {
    if (play) { setStartTime(now()) }
    else { setStartTime(0) }
  }, [play])

  useEffect(() => {
    let interval;

    if (play) {
      interval = setInterval(() => {
        playSound(startTime, speed)
        setTime( Math.floor((now() - startTime) / (speed * 1000)) )
      }, 10);
    } else {
      setTime(0);
      interval=0;
    }
    return () => clearInterval(interval);
  }, [time, play, speed]);

  // time < 100000000 removes first counter value which is always massive
  // This is because it uses 0 - now() since prev startTime is 0 on first render

  if (play && time < 100000000) { return(<h1>{ time }</h1>) }
  else { return (<h1>0</h1>) }
}

function CounterControl({ speed, play }) {
  return (
    <div className='w-48 h-16 bg-neutral-800 transition-colors rounded-full shadow-3xl flex justify-center flex-row'>
      <div className='flex flex-row items-center'>
        <h1>Counter &nbsp;</h1>
        <Count speed={speed} play={play} />
      </div>
    </div>
  )
}

function ToolBar({speed, setSpeed, play, setPlay, buttonStyle, setButtonStyle }) {

  return (
    <div className='w-screen h-24 bg-neutral-900 flex justify-center'>
      <div className='h-full flex text-white text-xl font-roboto'>
        <SpeedControl speed={ speed } setSpeed={ setSpeed }/>
        <MediaControl play = { play } setPlay={ setPlay } buttonStyle={ buttonStyle } setButtonStyle={ setButtonStyle } />
        <CounterControl speed={ speed } play={ play } />
      </div>
    </div>
  )
}

function Canvas({ speed, play }) {

  const animate = play ? speed : 0;

  const animationVariants = {
    0: 'left-[calc(50%-24px)] bg-teal-300 w-12 h-12 fixed rounded-full transition-all',
    1: 'animate-[travel_1s_linear_infinite] bg-teal-300 w-12 h-12 fixed rounded-full transition-all',
    2: 'animate-[travel_2s_linear_infinite] bg-teal-300 w-12 h-12 fixed rounded-full transition-all',
    3: 'animate-[travel_3s_linear_infinite] bg-teal-300 w-12 h-12 fixed rounded-full transition-all',
    4: 'animate-[travel_4s_linear_infinite] bg-teal-300 w-12 h-12 fixed rounded-full transition-all'
  }

  return (
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
  const [buttonStyle, setButtonStyle] = useState(1)

  useEffect(() => {
      setPlay(0)
      setButtonStyle(1)
  }, [speed])

  return (
    <div className='w-screen h-screen flex flex-col-reverse select-none'>
      <ToolBar setSpeed = { setSpeed } speed={ speed } play={ play }
        setPlay={ setPlay } buttonStyle={ buttonStyle }
        setButtonStyle={ setButtonStyle }/>
      {/* <div className='absolute w-1/2 h-screen bg-black opacity-50'></div> */}
      <Canvas speed = { speed } play = { play } />
      <h1 className='absolute bottom-0 text-teal-300 font-coolvetica text-3xl p-5'>webEMDR</h1>
    </div>    
  )
}

export default App
