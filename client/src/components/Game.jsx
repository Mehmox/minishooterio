//App.jsx
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from 'socket.io-client';

import LeaderBoard from "./LeaderBoard.jsx";
import client from "../js/client.js";

const ENV = process.env.REACT_APP_ENV;

export default function App({ nick }) {
    const navigate = useNavigate();

    const socket = useRef()

    const [leaderboard, setLeaderBoard] = useState([]);
    const mapDivRef = useRef(null);
    const gameCanvasRef = useRef(null);
    const mapCanvasRef = useRef(null);
    const scoreRef = useRef(null);

    useEffect(() => {
        socket.current = io(ENV === "development" ? "http://localhost:3001" : undefined, {
            query: { nick }
        })
    }, []);

    useEffect(() => client(socket.current, mapDivRef.current, mapCanvasRef.current, gameCanvasRef.current, scoreRef.current, setLeaderBoard), []);

    return <section className="h-screen flex flex-col">
        <section className="bg-red-600"><button onClick={() => navigate("/")}>Back</button></section>
        <main className="flex items-center bg-green-500">

            <section className="flex bg-gray-600">
                <div ref={mapDivRef} className="flex justify-end items-end">

                    <canvas id="map" ref={mapCanvasRef} className="w-60 h-60"></canvas>

                </div>

                <canvas id="game" ref={gameCanvasRef} ></canvas>

                <LeaderBoard ref={scoreRef} leaderboard={leaderboard} className="flex max-h-0" />
            </section>

        </main>
    </section>;

}
