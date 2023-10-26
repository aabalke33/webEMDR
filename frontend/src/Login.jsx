import { useState, useEffect } from "react";
import User from "./User";
import { FaRegPaste } from "react-icons/fa6";
import "./index.css";
import axios from "axios";

function Login({ setPage }) {
  const [input, setInput] = useState("");

  function enterPasscode(value) {
    setInput(value);

    if (value.length == 5) {
      const request = {
        type: "enter",
        code: value,
      };

      axios
        .post("http://localhost:8008/", request)
        .then((res) => {
          console.log(res.data);
          if (res.status == 200) {
            setPage(2);
          }
          if (res.status == 204) {
            console.log("No Match");
          }
        })
        .catch((err) => console.log(err));

      console.log("Render: ", value);
    }
  }

  return (
    <div className="w-screen h-screen flex select-none font-roboto bg-neutral-900 items-center justify-center">
      <div>
        <h1 className="text-6xl font-coolvetica p-5 text-teal-300">webEMDR</h1>
        <div className="top-1/2 h-24 flex items-center justify-center">
          <div className="w-48 h-16 bg-neutral-800 hover:bg-neutral-700 transition-colors rounded-full shadow-3xl">
            <div className="w-full h-full relative flex">
              <label className="absolute -top-3 left-8 text-white">
                Passcode
              </label>
              <FaRegPaste className="w-16 p-4  h-full transition-all text-white ease-in-out" />
              <input
                type="text"
                placeholder="*****"
                className="!outline-none selection:bg-neutral-500 text-white bg-transparent text-xl w-32 tracking-[0.5em] pl-2"
                maxLength={5}
                value={input}
                onInput={(e) => enterPasscode(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="h-16 top-1/2 flex items-center justify-center">
          <button
            className="text-neutral-500 w-36 h-8 hover:bg-neutral-800 hover:text-neutral-400 transition-colors rounded-full"
            onClick={() => setPage(1)}
          >
            Therapist Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
