//App.jsx
import { useNavigate } from "react-router-dom";
import Button from "./customs/Button";
import { useRef } from "react";
const ENV = process.env.REACT_APP_ENV;

export default function App({ setNick }) {

    const navigate = useNavigate();
    const nickRef = useRef();

    return <section className="h-screen flex flex-col justify-center items-center">

        <h1 className="text-7xl mt-20">SHOOTER.io</h1>

        <section className="w-screen h-screen flex flex-col justify-center items-center">

            <form className="w-full h-full flex flex-col justify-center items-center"
                onSubmit={(event) => {

                    event.preventDefault();

                    const nick = nickRef.current.value;

                    fetch(ENV === "production" ? "/check" : "http://localhost:3001/check", {
                        method: "POST",
                        body: JSON.stringify({ nick }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                        .then(answer => answer.json())
                        .then(isvalid => {

                            if (isvalid) {

                                setNick(nick);

                                navigate("/Play");

                            } else {

                                nickRef.current.setCustomValidity("Please use less word if you using emojis or not english letter!");
                                nickRef.current.reportValidity();

                            }

                        });

                }}>
                <input ref={nickRef} type="text" maxLength="9" placeholder="enter user name"
                    required className="w-input h-16 pb-3 text-5xl rounded-[16px] bg-gray-600" />
                <Button type="submit">START</Button>
            </form>

        </ section>

    </section>;
}
