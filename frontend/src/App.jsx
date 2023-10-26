import { useState, useEffect } from "react";
// import { Routes, Route} from 'react-router-dom'
// import User from "./User";
// import Login from "./Login";
// import Admin from "./Admin";
import "./index.css";
import axios from 'axios';

// function Page() {

//   const [page, setPage] = useState(0)

//   // console.log(page)

//   return (
//     <>
//       {page == 0 ? <Login setPage={ setPage } /> : null }
//       {page == 1 ? <Admin setPage={ setPage } /> : null }
//     </>
//   );

// }

// function Test() {
//   return(
//     <p>Hello World</p>
//   )
// }


function App() {

  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8008/')
      .then(res => setMessage(res.data))
      .catch(err => console.log(err));
  }, []);



return (
  // <Routes>
  //   <Route path='/' element={<Test />} />
  // </Routes>

  <h1>Hello: {message}</h1>


)
}

export default App;