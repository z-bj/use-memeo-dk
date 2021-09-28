import React, { useState, useEffect, useMemo } from "react";
import Profile from "./components/Profile";
import "./App.css";
import axios from "axios";

function App() {
  const [count, setCount] = useState(1);
  const [profile, setProfile] = useState({});
  const [dark, setDark] = useState(false);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${count}`)
      .then((response) => {
        setProfile(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [count]);

  const goDark = () => {
    setDark(!dark);

    if (!dark) {
      document.body.classList.add("bg-secondary");
    } else {
      document.body.classList.remove("bg-secondary");
    }
  };

  const classBtnTheme = dark ? "btn-light" : "btn-dark";
  const txtBtnTheme = dark ? "rendre-clair" : "rendre-sombre";

  const memoizedValue = useMemo(() => {
    console.log("je suis dans isOverTen");
    return count > 10;
  }, [count]);

  console.log(memoizedValue);

  return (
    <div className="Container">
      <h1 className="text-center">UseMemo()</h1>
      {memoizedValue && (
        <div className="alert alert-danger" role="alert">
          Stop !!!
        </div>
      )}
      <button className="btn btn-info mb-3" onClick={() => setCount(count + 1)}>
        Increment {count}
      </button>
      <button
        className={`btn ${classBtnTheme} mb-3 float-right`}
        onClick={goDark}
      >
        {txtBtnTheme}
      </button>
      <Profile count={count} profile={profile} />
    </div>
  );
}

export default App;
