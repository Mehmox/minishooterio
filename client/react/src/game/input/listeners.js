export default function Listeners(StateManager) {
    const { client, session, react } = StateManager;

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
                react.uiUpdateStates.setTabs(prev => {
                    if (prev.Tab) return prev;
                    return { ...prev, Tab: true }
                }); break;
            case "Escape": react.uiUpdateStates.setTabs(prev => {
                if (prev.Settings) return prev;
                return { ...prev, Settings: !prev.Settings }
            }); break;
            case "Space": client.isShooting = true; break;
            case "KeyW":
            case "KeyA":
            case "KeyS":
            case "KeyD": client[code] = true; break;
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
                react.uiUpdateStates.setTabs(prev => {
                    return {
                        ...prev,
                        Tab: false
                    }
                }); break;
            case "Space": client.isShooting = false; break;
            case "KeyW":
            case "KeyA":
            case "KeyS":
            case "KeyD": client[code] = false; break;
            default: break;
        }

    }

    function onMouseMove(event) {

        client.Muzzle_Direction = { x: event.clientX / window.innerWidth * 1920, y: event.clientY / window.innerHeight * 925 };

    }

    function onMouseDown(event) {

        if (event.button === 0) client.isShooting = true;

    }

    function onMouseUp(event) {

        if (event.button === 0) client.isShooting = false;

    }

    function onResize() {

        react.refs.gameRef.current.width = window.innerWidth;
        react.refs.gameRef.current.height = window.innerHeight;

        session.scale = 1 / window.devicePixelRatio;

    }

    window.addEventListener("keydown", onKeyDown, { passive: false });
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("resize", onResize);

    return () => {

        window.removeEventListener("keydown", onKeyDown);
        window.removeEventListener("keyup", onKeyUp);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mousedown", onMouseDown);
        window.removeEventListener("mouseup", onMouseUp);
        window.removeEventListener("resize", onResize);

    }

}