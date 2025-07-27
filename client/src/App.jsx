//client/src/App.jsx

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./components/Home.jsx";
import Game from "./components/Game.jsx";
import { useState } from "react";

export default function App() {

  const [nick, setNick] = useState();

  return <Router>

    <Routes>

      <Route path="/" element={<Navigate to="/login" replace />} navigator></Route>

      <Route path="/register" element={<Home setNick={setNick} type="register" />}></Route>

      <Route path="/login" element={<Home setNick={setNick} type="login" />}></Route>

      <Route path="/game" element={<Game nick={nick} />}></Route>

    </Routes>

  </Router>;
}
