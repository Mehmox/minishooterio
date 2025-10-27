import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import initClient from "../game/core/initClient.js";

import Quit from "./customs/Quit.jsx";
import Map from "./Map.jsx";
import Tab from "./Tab.jsx";

export default function Game({ socket, gameOptions }) {
    const navigate = useNavigate();

    const refs = useRef({
        gameRef: useRef(null),
        mapRef: useRef(null),
        gameCtx: undefined,
        mapCtx: undefined,
    });

    const uiRefs = useRef({
        leaderboard: useRef(),
        ping: useRef(),
        playerCount: useRef(),
        bytes: useRef(),
        dev: useRef()
    });

    const [tabs, setTabs] = useState({ Tab: false, });
    const [test, setTest] = useState();

    const uiStates = useRef({ tabs, test, });
    const uiUpdateStates = useRef({ setTabs, setTest, });

    useEffect(() => {
        if (!socket) {
            navigate("/");
            return;
        }

        const props = {
            socket,
            refs: refs.current,
            uiRefs: uiRefs.current,
            uiStates: uiStates.current,
            uiUpdateStates: uiUpdateStates.current,
            fgColor: gameOptions.DarkMode.value ? "White" : "Black",
            bgColor: gameOptions.DarkMode.value ? "Black" : "White",
        }

        uiRefs.current.ping.current.style.color = props.fgColor;
        uiRefs.current.playerCount.current.style.color = props.fgColor;
        uiRefs.current.bytes.current.style.color = props.fgColor;
        refs.current.gameRef.current.style.backgroundColor = props.bgColor;
        refs.current.mapRef.current.style.backgroundColor = props.bgColor;

        const CleanUp = initClient(props);

        return () => {
            if (CleanUp) {
                CleanUp();
                socket.disconnect();
                console.log("Game.jsx unmounted");
            }
        }
    }, []);

    return <main className="h-screen flex flex-col justify-center items-center relative">

        {tabs.Tab && <Tab className="w-[1000px] h-[400px] border-2 rounded-md bg-[rgba(174,174,174,0.3)]"
            leaderboard={uiRefs.current.leaderboard}
            dev={test} />}

        <Quit className={`z-[1] absolute left-[10px] top-[10px] w-12 h-12 border-[1px] border-solid border-[rgb(137,137,137)] rounded-md bg-[rgba(181,181,181,0.73)]`}
            onClick={() => navigate("/")}
            color="white" />

        <Map className="z-[1] absolute bottom-0 right-0"
            borderColor={gameOptions.DarkMode.value ? "white" : "black"}
            mapRef={refs.current.mapRef}
            uiRefs={uiRefs.current}
        />

        <canvas id="game" ref={refs.current.gameRef} className="z-[0] w-screen h-screen " />

    </main>;

}