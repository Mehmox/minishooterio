//App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home.jsx";
import Game from "./components/Game.jsx";
import { useState } from "react";

export default function App() {

  const [nick, setNick] = useState();

  return <>
    <Router>

      <Routes>

        <Route path="/" element={<Home setNick={setNick} />}></Route>

        <Route path="/Play" element={<Game nick={nick} />}></Route>

      </Routes>

    </Router>
  </ >;
}
