//App.jsx
import { useNavigate } from "react-router-dom";
import Button from "./customs/Button";
import { useRef } from "react";

export default function App({ setNick }) {

    const navigate = useNavigate();
    const nick = useRef();

    return <section className="h-screen flex flex-col justify-center items-center">

        <h1 className="text-7xl mt-20">SHOOTER.io</h1>

        <section className="w-screen h-screen flex flex-col justify-center items-center">

            <form className="w-full h-full flex flex-col justify-center items-center"
                onSubmit={(event) => {

                    event.preventDefault();

                    setNick(nick.current.value);

                    navigate("/Play");

                }}>
                <input ref={nick} type="text" maxLength="17" placeholder="enter user name"
                    className="w-input h-16 pb-3 text-5xl rounded-[16px] bg-gray-600" />
                <Button type="submit">START</Button>
            </form>
            
        </ section>

    </section>;
}
