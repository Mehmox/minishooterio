import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import Settings from "./Settings.jsx";
const ENV = process.env.REACT_APP_ENV;

export default function Home({ type, setNick, Menu, setMenu, options, SetOptions }) {

    const navigate = useNavigate();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    // useEffect(() => emailRef.current.setCustomValidity(""), [emailRef.current?.value, passwordRef.current?.value]);

    function submit(event) {

        event.preventDefault();

        const username = usernameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        fetch((ENV !== "production" ? "http://localhost:3001/" : "/") + type, {
            method: "POST",
            body: JSON.stringify({ username, email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(answer => answer.json())
            .then(({ err, username }) => {

                // if (!err) {

                setNick(username);

                navigate("/game");

                // } else {

                //     emailRef.current.setCustomValidity(err);

                //     emailRef.current.reportValidity();

                // }

            });

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
    }, [])

    return <section className="h-screen flex flex-col justify-center items-center">

        <h1 className="text-7xl mt-20">{type}</h1>

        {Menu.Settings && <Settings className="z-[2] w-[65%] h-[80%] fixed border-2 rounded-3xl bg-gray-700 flex flex-col justify-center"
            options={options} SetOptions={SetOptions} />}

        <section className="w-screen h-screen flex flex-col justify-center items-center">

            <form className="w-full h-full flex flex-col justify-center items-center" onSubmit={submit}>

                {/* <input ref={emailRef} autoComplete="email" name="email" type="email" placeholder="email" required className="inputs" /> */}

                {/* {type === "register" && <input ref={usernameRef} name="username" type="text" maxLength="9" placeholder="username" required className="inputs" />} */}

                <input ref={usernameRef} name="username" type="text" maxLength="9" placeholder="username" required className="inputs" />

                {/* <input ref={passwordRef} autoComplete={type === "login" ? "current-password" : "new-password"} name="password" type="password" placeholder="password" required className="inputs" /> */}

                {/* <button type="submit" className="bg-red-500 w-48 h-8 rounded-[16px]">{type}</button> */}
                <button type="submit" className="bg-red-500 w-48 h-8 rounded-[16px]">Join</button>

                {/* <button type="button" onClick={() => navigate(type === "login" ? "/register" : "/login")} className="bg-blue-700 w-48 h-8 rounded-[16px]">{type === "login" ? "register" : "login"}</button> */}

            </form>

        </section>

    </section >;
}