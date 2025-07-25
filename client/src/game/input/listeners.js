export default function Listeners(client, canvas, setTabs, user, system, ctx) {

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

    function onMouseMove(event) {

        combat.Muzzle_Direction = { x: event.clientX / window.innerWidth * 1920, y: event.clientY / window.innerHeight * 925 };

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

        if (window.devicePixelRatio !== baseRatio) {
            onZoom();
            baseRatio = window.devicePixelRatio; // Yeni referans alınır
        }

    }

    // function onZoom() {

    //     const multiplier = 1 / (window.devicePixelRatio || 1);
    //     console.log(multiplier)
    //     user.bulletsize = user.bulletsizeDefault * multiplier;
    //     user.size = user.sizeDefault * multiplier;
    //     system.lineWidth = 0.3 * multiplier;
    //     system.lineGap = 30 * multiplier;

    // }

    let baseRatio = window.devicePixelRatio;

    function onZoom() {
        const currentRatio = window.devicePixelRatio;
        const multiplier = baseRatio / currentRatio;

        console.log("Zoom değişti", currentRatio, "Çarpan:", multiplier);

        user.bulletsize = user.bulletsizeDefault * multiplier;
        user.size = user.sizeDefault * multiplier;
        system.lineWidth = 0.3 * multiplier;
        system.lineGap = 30 * multiplier;
    }

    window.addEventListener("keydown", onKeyDown, { passive: false });
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("resize", onResize);
    window.addEventListener("wheel", onZoom);

    return () => {

        window.removeEventListener("keydown", onKeyDown);
        window.removeEventListener("keyup", onKeyUp);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mousedown", onMouseDown);
        window.removeEventListener("mouseup", onMouseUp);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("wheel", onZoom);

    }

}