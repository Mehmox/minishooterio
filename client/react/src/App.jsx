import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home.jsx";
import Game from "./components/Game.jsx";
import { useState } from "react";

export default function App() {

  const [socket, setSocket] = useState();
  const [Menu, setMenu] = useState({ Settings: false, });
  const [gameOptions, SetGameOptions] = useState({
    DarkMode: {
      type: "Button", name: "DarkMode",
      value: Boolean(+window.localStorage.getItem("DarkMode")),
      description: "Changes the in game main color white to black."
    },
  });

  return <Router>

    <Routes>

      <Route path="/" element={<Home h1="MiniShooterIO"
        setSocket={setSocket}
        gameOptions={gameOptions}
        Menu={Menu}
        setMenu={setMenu}
        SetGameOptions={SetGameOptions} />} navigator />

      <Route path="/game" element={<Game socket={socket} gameOptions={gameOptions} />} />

    </Routes>

  </Router >;
}
