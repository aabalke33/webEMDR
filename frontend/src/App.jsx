import { useState, useEffect } from "react";
// import { Routes, Route} from 'react-router-dom'
import User from "./User";
import Login from "./Login";
import Admin from "./Admin";
import "./index.css";
import axios from 'axios';

function Page() {

  const [page, setPage] = useState(0)

  // console.log(page)

  return (
    <>
      {page == 0 ? <Login setPage={ setPage } /> : null }
      {page == 1 ? <Admin setPage={ setPage } /> : null }
      {page == 2 ? <User setPage={ setPage } /> : null }
    </>
  );

}

function App() {

  // const [message, setMessage] = useState('');

  // useEffect(() => {
  //   axios.get('http://localhost:8008/')
  //     .then(res => setMessage(res.data))
  //     .catch(err => console.log(err));
  // }, []);

  // const [makeRequest, setMakeRequest] = useState(0)

  // let requestBody = {
  //   id: new Date().getTime(),
  //   play: 0,
  //   speed: 4
  // }

  // function sendData() {
  //   axios.put('http://localhost:8008/', requestBody)
  //     .then(res => setMessage(res.data))
  //     .catch(err => console.log(err));
  // }

  // function sendData() {
  //   axios.post('http://localhost:8008/', requestBody)
  //   .then(res => setMessage(res.data))
  //   .catch(err => console.log(err));
  // }

  // useEffect(sendData, [])

return (
  
  // <button onClick={() => sendData()} className="p-2 text-white font-medium font-roboto text-lg justify-center flex text-center bg-slate-600 rounded-xl">Button</button>
  <Page />

)
}

export default App;