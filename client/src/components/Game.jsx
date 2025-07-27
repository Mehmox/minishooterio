import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from 'socket.io-client';

import client from "../js/core/client.js";

import Quit from "./customs/Quit.jsx";
import Map from "./Map.jsx";
import Tab from "./Tab.jsx";

const ENV = process.env.REACT_APP_ENV;

export default function Game({ nick, options }) {

    const navigate = useNavigate();

    const socket = useRef(null);
    const gameRef = useRef(null);
    const mapRef = useRef(null);

    const Color = options[0].value ? "white" : "black";

    const data = useRef({
        leaderboard: useRef(),
        ping: useRef(),
        net: useRef(),
        dev: useRef()
    });

    const [tabs, setTabs] = useState({
        Tab: false,
    });
    const [test, setTest] = useState();

    useEffect(() => {

        socket.current = io(ENV === "development" ? "http://localhost:3001" : undefined, {
            query: { nick }
        })

        const CleanUp = client({
            socket: socket.current,
            canvas: gameRef.current,
            map: mapRef.current,
        }, data.current, options, setTabs, setTest)

        return () => {
            CleanUp();
            socket.current.disconnect();
            console.log("Game.jsx unmounted");
        }

    }, []);

    return <main className="h-screen flex flex-col justify-center items-center relative">

        <Quit onClick={() => navigate("/register")}
            className={`z-[1] absolute left-[10px] top-[10px] w-14 h-14 border-4 border-solid rounded-md`}
            color={Color} />

        <Map className="z-[1] absolute bottom-0 right-0"
            color={Color}
            mapRef={mapRef}
            data={data.current}
        />

        {tabs.Tab && <Tab className="w-[1000px] h-[400px] border-2 rounded-md rgba(174,174,174,1)"
            leaderboard={data.leaderboard}
            dev={test} />}

        <canvas id="game" ref={gameRef} className="z-[0] w-screen h-screen " />

    </main>;

}
