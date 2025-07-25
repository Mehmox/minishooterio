import { useRef } from "react";
import Button from "./customs/Button";

export default function Settings({ className, options = [], SetOptions }) {

    const descriptionRefs = useRef([useRef(), useRef()]);

    function Edit(index) {

        SetOptions(pre => {
            const res = [...pre];
            res[index].value = !pre[index].value;
            window.localStorage.setItem(res[index].name, Number(res[index].value));
            return res;
        });

    }

    function Hove(i, hide) {
        
        if (!hide) {
            descriptionRefs.current[i].current.style.opacity = "100";
            descriptionRefs.current[i].current.style.zIndex = "2";
        } else {
            descriptionRefs.current[i].current.style.opacity = "0";
            descriptionRefs.current[i].current.style.zIndex = "-1";
        }

    }

    return <section className={className}>

        <div className="h-[85%] flex flex-col items-center justify-start text-white text-3xl">

            {options.map((option, i) => <div key={i} className="w-[80%] flex justify-between items-center mb-6">

                <h2>{option.name}</h2>

                <div ref={descriptionRefs.current[i]} className="z-[-1] opacity-0 max-w-[345px] ">{option.description}</div>

                <div className="flex items-baseline">
                    {option.type === "Button" ? <Button onClick={() => Edit(i)} checked={options[i].value}></Button> : <input></input>}

                    <div
                        onMouseEnter={() => Hove(i, false)}
                        onMouseLeave={() => Hove(i, true)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-question-circle ml-3 z-1"
                            viewBox="0 0 16 16"
                            style={{ pointerEvents: "none" }}>
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94" />
                        </svg>
                    </div>
                </div>

            </div>)}

        </div>

    </section>
}