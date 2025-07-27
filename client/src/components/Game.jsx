//client/src/components/Game.jsx
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from 'socket.io-client';

import Quit from "./customs/Quit.jsx";
import LeaderBoard from "./LeaderBoard.jsx";
import client from "../js/client.js";

const ENV = process.env.REACT_APP_ENV;

export default function Game({ nick }) {

    const navigate = useNavigate();

    const socket = useRef()

    const [leaderboard, setLeaderBoard] = useState([]);
    const mapDivRef = useRef(null);
    const scoreDivRef = useRef(null);
    const mapCanvasRef = useRef(null);
    const gameCanvasRef = useRef(null);
    const scoreRef = useRef(null);
    const pingRef = useRef(null);
    const byteRef = useRef(null);

    useEffect(() => {

        socket.current = io(ENV === "development" ? "http://localhost:3001" : undefined, {
            query: { nick }
        })

        return () => socket.current.disconnect();

    }, []);

    useEffect(() => client(socket.current, mapDivRef.current, scoreDivRef.current, mapCanvasRef.current, gameCanvasRef.current, scoreRef.current, pingRef.current, byteRef.current, setLeaderBoard), []);

    return <section className="h-screen flex flex-col justify-between">

        <section className="w-28 h-16 absolute left-0 top-0"><Quit onClick={() => navigate("/login")}>Quit</Quit></section>

        <main className="flex items-center bg-green-500">

            <section className="flex bg-gray-600">

                <div ref={mapDivRef} className="flex flex-col justify-end items-end">

                    <section className="flex my-0 p-0">
                        <section ref={byteRef} className="mr-2"></section>
                        <section ref={pingRef} className="w-[80px]"></section>
                    </section>

                    <canvas id="map" ref={mapCanvasRef} className="w-60 h-60"></canvas>

                </div>

                <canvas id="game" ref={gameCanvasRef} ></canvas>

                <div ref={scoreDivRef} className="flex justify-end items-end">

                    <LeaderBoard ref={scoreRef} leaderboard={leaderboard} />

                </div>

            </section>

        </main>

    </section>;

}
