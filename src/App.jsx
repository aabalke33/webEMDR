import { useState, useEffect } from "react";
import User from "./User";
import Login from "./Login";
import Admin from "./Admin";
import "./index.css";

function App() {

  const [page, setPage] = useState(0)

  console.log(page)

  return (
    <>
      {page == 0 ? <Login setPage={ setPage } /> : null }
      {page == 1 ? <Admin setPage={ setPage } /> : null }
    </>
  );
}

export default App;