import lerp from "../core/Lerp";

export default function Listeners(client, Interpolate, canvas, setTest, { setTabs }) {

    const movement = client.movement;
    const combat = client.combat;

    function onKeyDown(event) {

        let code = event.code;

        switch (code) {
            case "ArrowUp":
            case "ArrowLeft":
            case "ArrowDown":
            case "ArrowRight":
            case "ShiftLeft":
            case "Space":
            case "Escape":
            case "Tab":
                event.preventDefault(); break;
            default: break;
        }

        switch (code) {
            case "ArrowUp": code = "KeyW"; break;
            case "ArrowLeft": code = "KeyA"; break;
            case "ArrowDown": code = "KeyS"; break;
            case "ArrowRight": code = "KeyD"; break;
            default: break;
        }

        switch (code) {
            case "ShiftLeft":
                setTabs(prev => {
                    if (prev.Tab) return prev;
                    return { ...prev, Tab: true }
                }); break;
            case "Escape": setTabs(prev => {
                if (prev.Settings) return prev;
                return { ...prev, Settings: !prev.Settings }
            }); break;
            case "Space": combat.isShooting = true; break;
            case "KeyW":
            case "KeyA":
            case "KeyS":
            case "KeyD": movement[code] = true; break;
            default: break;
        }

    }

    function onKeyUp(event) {

        let code = event.code;

        switch (code) {
            case "ArrowUp": code = "KeyW"; break;
            case "ArrowLeft": code = "KeyA"; break;
            case "ArrowDown": code = "KeyS"; break;
            case "ArrowRight": code = "KeyD"; break;
            default: break;
        }

        switch (code) {
            case "ShiftLeft":
                setTabs(prev => {
                    return {
                        ...prev,
                        Tab: false
                    }
                }); break;
            case "Space": combat.isShooting = false; break;
            case "KeyW":
            case "KeyA":
            case "KeyS":
            case "KeyD": movement[code] = false; break;
            default: break;
        }

    }

    function onKeyPress(event) {

        if (event.code === 'KeyC') {
            lerp.set();
            Interpolate = lerp.isOn;
        }

    }
    // let test = 0;
    function onMouseMove(event) {
        // test++;
        // if (test % 300 === 0) {
        //     console.log("client")
        //     console.log(event.clientX, event.clientY)
        //     console.log("page")
        //     console.log(event.pageX, event.pageY)
        //     console.log("screen")
        //     console.log(event.screenX, event.screenY)
        //     console.log("x-y")
        //     console.log(event.x, event.y)
        //     console.log("\n")
        // }
        combat.Muzzle_Direction = { x: event.clientX / window.innerWidth * 1920, y: event.clientY / window.innerHeight * (window.innerHeight - 155) };
        // console.log(event.clientX, event.clientY)
        // console.log(combat.Muzzle_Direction)
    }

    function onMouseDown(event) {

        if (event.button === 0) combat.isShooting = true;

    }

    function onMouseUp(event) {

        if (event.button === 0) combat.isShooting = false;

    }

    function onResize() {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // setTest({
        //     outer: {
        //         Width: event.currentTarget.outerWidth,
        //         Height: event.currentTarget.outerHeight,
        //     },
        //     inner: {
        //         Width: event.srcElement.innerWidth,
        //         Height: event.srcElement.innerHeight,
        //     },
        //     avail: {
        //         Width: event.target.screen.availWidth,
        //         Height: event.target.screen.availHeight,
        //     }
        // })

    }

    window.addEventListener("keydown", onKeyDown, { passive: false });
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keypress", onKeyPress);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("resize", onResize);

    window.dispatchEvent(new Event('resize'));

    return () => {

        window.removeEventListener("keydown", onKeyDown);
        window.removeEventListener("keyup", onKeyUp);
        window.removeEventListener("keypress", onKeyPress);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mousedown", onMouseDown);
        window.removeEventListener("mouseup", onMouseUp);
        window.removeEventListener("resize", onResize);

    }

}