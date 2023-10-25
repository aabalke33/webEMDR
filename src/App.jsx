import { useState, useEffect } from "react";
import ToolBar from "./ToolBar";
import "./index.css";

function Canvas({ speed, play }) {
  const animate = play ? speed : 0;

  const animationVariants = {
    0: "left-[calc(50%-24px)] bg-teal-300 w-12 h-12 fixed rounded-full transition-all",
    1: "animate-[travel_1s_linear_infinite] bg-teal-300 w-12 h-12 fixed rounded-full transition-all",
    2: "animate-[travel_2s_linear_infinite] bg-teal-300 w-12 h-12 fixed rounded-full transition-all",
    3: "animate-[travel_3s_linear_infinite] bg-teal-300 w-12 h-12 fixed rounded-full transition-all",
    4: "animate-[travel_4s_linear_infinite] bg-teal-300 w-12 h-12 fixed rounded-full transition-all",
  };

  return (
    <div className="w-screen bg-neutral-900 flex flex-grow items-center">
      <div className="w-full h-12 top-1/2">
        <div className={`${animationVariants[animate]}`}></div>
      </div>
    </div>
  );
}

function App() {
  const [speed, setSpeed] = useState(4);
  const [play, setPlay] = useState(0);
  const [buttonStyle, setButtonStyle] = useState(1);

  useEffect(() => {
    setPlay(0);
    setButtonStyle(1);
  }, [speed]);

  return (
    <div className="w-screen h-screen flex flex-col-reverse select-none">
      <ToolBar
        setSpeed={setSpeed}
        speed={speed}
        play={play}
        setPlay={setPlay}
        buttonStyle={buttonStyle}
        setButtonStyle={setButtonStyle}
      />
      {/* <div className='absolute w-1/2 h-screen bg-black opacity-50'></div> */}
      <Canvas speed={speed} play={play} />
      <h1 className="absolute bottom-0 text-teal-300 font-coolvetica text-3xl p-5">
        webEMDR
      </h1>
    </div>
  );
}

export default App;
