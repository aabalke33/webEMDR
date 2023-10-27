import { useState, useEffect } from "react";
import User from "./User";
import Login from "./Login";
import Admin from "./Admin";
import "./index.css";
import axios from "axios";

function Page() {
  const [page, setPage] = useState(0);
  const [passcode, setPasscode] = useState();

  return (
    <>
      {page == 0 ? <Login setPage={setPage} setPasscode={setPasscode} /> : null}
      {page == 1 ? <Admin setPage={setPage} /> : null}
      {page == 2 ? <User setPage={setPage} passcode={passcode} /> : null}
    </>
  );
}

function App() {
  return <Page />;
}

export default App;
