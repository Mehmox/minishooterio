import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { io } from 'socket.io-client';

import StateManager from "../game/state/StateManager.js"
import Settings from "./Settings.jsx";
import './customs/Loading.css';

const ENV = import.meta.env.VITE_ENV || "development";
const Domain = import.meta.env.VITE_Domain;

StateManager.Development = ENV === "development";

export default function Home({ h1, setSocket, Menu, setMenu, gameOptions, SetGameOptions }) {

    const navigate = useNavigate();
    const usernameRef = useRef();
    const socket = useRef();

    const btn = useRef();
    const loading = useRef();

    async function submit(event) {

        event.preventDefault();

        let uri;
        const option = { query: { nick: usernameRef.current?.value } };

        btn.current.disabled = true;

        loading.current.style.display = "block";

        if (!StateManager.Development) {
            const res = await fetch(`https://${Domain}/connect`);

            if (!res.ok) throw new Error("Load balancer did not respond");

            const { token, SUB, PORT } = await res.json();

            uri = `wss://${SUB}.${Domain}:${PORT}`;

            option.auth = { token };
        } else {
            uri = `ws://localhost:3001`;
        }

        console.log(`Connecting to ${uri}`);

        socket.current = io(uri, option);

        setSocket(socket.current);

        navigate("/game");

    }

    function Toggle(event) {

        let code = event.code;

        switch (code) {
            case "Escape":
                event.preventDefault(); break;
            default: break;
        }

        switch (code) {
            case "Escape":
                setMenu(pre => {
                    return {
                        ...pre,
                        Settings: !pre.Settings
                    }
                });
                break;
            default: break;
        }

    }

    useEffect(() => {
        window.addEventListener("keydown", Toggle, { passive: false });

        return () => window.removeEventListener("keydown", Toggle);
    }, []);

    return <section className="h-screen flex flex-col justify-center items-center">

        {Menu.Settings && <Settings className="z-[2] w-[65%] h-[80%] fixed border-2 rounded-3xl bg-black flex flex-col justify-center"
            gameOptions={gameOptions} SetGameOptions={SetGameOptions} />}

        <section className="w-screen h-screen flex flex-col justify-center items-center">

            <form className="w-full h-full flex flex-col justify-center items-center" onSubmit={submit}>

                <h1 className="text-8xl mb-32 text-white">{h1}</h1>

                <input ref={usernameRef} name="username" h1="text" maxLength="9" placeholder="username" required
                    className="w-input h-16 pb-3 pl-5 text-5xl rounded-[9px]" />

                <button ref={btn} h1="submit" className="bg-blue-500 w-[300px] h-12 mt-10 text-[30px] text-white rounded-[9px] flex justify-center items-center">Play!
                    <div ref={loading} className="spinner" style={{ display: "none" }} >
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </button>

            </form>

        </section>

    </section >;
}