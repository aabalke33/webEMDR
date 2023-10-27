import { useState, useEffect, useRef } from "react";
import User from "./User";
import ToolBar from "./ToolBar";
import { FaRegCopy } from "react-icons/fa6";
import { BiRefresh } from "react-icons/bi";
import "./index.css";
import axios from "axios";
import backendServer from "./config";

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

function Admin({ setPage }) {
  const [passcode, setPasscode] = useState(
    Math.floor(Math.random() * 100000)
      .toString()
      .padStart(5, "0")
  );
  const [speed, setSpeed] = useState(4);
  const [play, setPlay] = useState(0);
  const [buttonStyle, setButtonStyle] = useState(1);
  const initialLoad = useRef(true);

  useEffect(() => {
    if (initialLoad.current) {
      const request = {
        type: "create",
        code: passcode,
        play: 0,
        speed: speed,
      };

      axios
        .post(backendServer, request)
        // .then((res) => )
        .catch((err) => console.log(err));

      initialLoad.current = false;
    }
  }, [initialLoad]);

  useEffect(() => {
    const request = {
      type: "update",
      code: passcode,
      play: play,
      speed: speed,
    };

    axios
      .post(backendServer, request)
      // .then((res))
      .catch((err) => console.log(err));
  }, [play, speed, passcode]);

  useEffect(() => {
    setPlay(0);
    setButtonStyle(1);
  }, [speed]);

  function createPasscode() {
    const code = Math.floor(Math.random() * 100000)
      .toString()
      .padStart(5, "0");
    setPasscode(code);

    if (play) {
      setPlay(0);
    }

    const request = {
      type: "create",
      code: code,
      play: 0,
      speed: speed,
    };

    axios
      .post(backendServer, request)
      // .then((res))
      .catch((err) => console.log(err));
  }

  function copyPasscode() {
    navigator.clipboard.writeText(passcode);
  }

  // componentDidMount

  return (
    <>
      <div className="w-screen h-screen flex select-none font-roboto items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-coolvetica p-5 text-teal-300">
            webEMDR
          </h1>
          <div className="top-1/2 h-24 flex items-center justify-center">
            <div
              className="w-48 h-16 bg-neutral-800 hover:bg-neutral-700 transition-colors rounded-full shadow-3xl active:bg-neutral-500"
              onClick={copyPasscode}
            >
              <div className="w-full h-full relative flex">
                <label className="absolute -top-3 left-8 text-white">
                  Passcode
                </label>
                <FaRegCopy className="w-16 p-4 h-full transition-all text-white ease-in-out" />
                <p className="!outline-none selection:bg-neutral-500 text-white bg-transparent text-xl w-32 tracking-[0.5em] pl-0 py-4">
                  {passcode}
                </p>
              </div>
            </div>
            <BiRefresh
              className="w-16 p-4 px-1 h-full text-neutral-500 active:animate-spin-one-way hover:text-white transition-transform flex"
              onClick={createPasscode}
            />
          </div>
          {/* <p className="text-white p-1">Patient is not connected.</p> */}
          <div className="opacity-25 py-5">
            <Canvas speed={speed} play={play} />
          </div>
          <ToolBar
            setSpeed={setSpeed}
            speed={speed}
            play={play}
            setPlay={setPlay}
            buttonStyle={buttonStyle}
            setButtonStyle={setButtonStyle}
          />
          <button
            onClick={() => setPage(0)}
            className="text-neutral-400 bg-neutral-800 w-16 h-8 hover:bg-red-800 hover:text-white transition-colors rounded-full shadow-3xl"
          >
            Exit
          </button>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-screen h-screen bg-neutral-900 -z-20"></div>
    </>
  );
}

export default Admin;
