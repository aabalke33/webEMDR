import { useState, useEffect, useRef } from "react";
import "./index.css";
import { usePageVisibility } from "./usePageVisibility";
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

function Count({ speed, play }) {
  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState(0);

  function now() {
    return new Date().getTime();
  }

  useEffect(() => {
    if (play) {
      setStartTime(now());
    } else {
      setStartTime(0);
    }
  }, [play]);

  useEffect(() => {
    const audioLeft = new Audio("./left.mp3");
    const audioRight = new Audio("./right.mp3");

    function playSound(startTime, speed) {
      const variance = 5 + speed * 1;
      const elapse = (now() - startTime) % (speed * 1000);
      const leftFloor = speed * 250 - variance;
      const leftCeil = speed * 250 + variance;
      const rightFloor = speed * 750 - variance;
      const rightCeil = speed * 750 + variance;
      const locationLeft = leftFloor < elapse && elapse < leftCeil;
      const locationRight = rightFloor < elapse && elapse < rightCeil;

      if (locationLeft) {
        audioLeft.play();
      }
      if (locationRight) {
        audioRight.play();
      }
    }

    let interval;

    if (play) {
      interval = setInterval(() => {
        playSound(startTime, speed);
        setTime(Math.floor((now() - startTime) / (speed * 1000)));
      }, 1000);
    } else {
      setTime(0);
      interval = 0;
    }
    return () => clearInterval(interval);
  }, [time, play, speed, startTime]);

  return <></>;
}

function User({ setPage, passcode }) {
  const isVisible = usePageVisibility();

  const [speed, setSpeed] = useState(4);
  const [play, setPlay] = useState(0);
  const [buttonStyle, setButtonStyle] = useState(1);
  const [polling, setPolling] = useState(true);

  const timerIdRef = useRef(null);

  useEffect(() => {
    function pollingCallback() {
      const request = {
        type: "enter",
        code: passcode,
      };

      axios
        .post(backendServer, request)
        .then((res) => {
          setPlay(res.data.play);
          setSpeed(res.data.speed);
        })
        .catch((err) => console.log(err));

      startPolling();
    }

    function startPolling() {
      timerIdRef.current = setTimeout(pollingCallback, 500);
    }

    function stopPolling() {
      clearTimeout(timerIdRef.current);
    }

    if (isVisible && polling) {
      startPolling();
    } else {
      stopPolling();
    }

    return () => {
      stopPolling();
    };
  }, [isVisible, polling]);

  useEffect(() => {
    setPlay(0);
    setButtonStyle(1);
  }, [speed]);

  return (
    <div className="w-screen h-screen flex flex-col-reverse select-none">
      {/* <div className='absolute w-1/2 h-screen bg-black opacity-50'></div> */}
      <Canvas speed={speed} play={play} />
      <Count speed={speed} play={play} />
      <div className="absolute bottom-0 left-0 p-10">
        <button
          onClick={() => setPage(0)}
          className="font-roboto text-neutral-400 bg-neutral-800 w-32 h-8 hover:bg-red-800 hover:text-white transition-colors rounded-full shadow-3xl"
        >
          Exit
        </button>
      </div>
    </div>
  );
}

export default User;
