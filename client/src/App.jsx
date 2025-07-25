import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./components/Home.jsx";
import Game from "./components/Game.jsx";
import { useState } from "react";

export default function App() {

  const [nick, setNick] = useState();
  const [Menu, setMenu] = useState({
    Settings: false,
  });
  const [options, SetOptions] = useState([
    { type: "Button", name: "DarkMode", value: Boolean(+window.localStorage.getItem("DarkMode")), description: "Changes the in game main color white to black." },
    // { type: "Button", name: "lerp", value: Boolean(+window.localStorage.getItem("lerp")), description: "Empty frames gonna filled. Basically game looks smooth." },
  ]);

  return <Router>

    <Routes>

      <Route path="/" element={<Navigate to="/register" replace />} navigator />

      <Route path="/register" element={<Home type="register"
        setNick={setNick}
        Menu={Menu}
        setMenu={setMenu}
        options={options}
        SetOptions={SetOptions} />} />

      <Route path="/login" element={<Home type="login" SetOptions={SetOptions} />} />

      <Route path="/game" element={<Game nick={nick} options={options} />} />

    </Routes>

  </Router >;
}
