//client/src/js/listeners.js
export default function Listeners(client) {

    const movement = client.events.movement;
    const combat = client.events.combat;

    window.addEventListener("keydown", (event) => {

        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            event.preventDefault();
        }

        let key = event.key;

        switch (key) {
            case "ArrowUp": key = "w"; break;
            case "ArrowDown": key = "s"; break;
            case "ArrowLeft": key = "a"; break;
            case "ArrowRight": key = "d"; break;
            default: break;
        }

        switch (key) {
            case "w":
            case "s":
            case "a":
            case "d":
                movement[key] = true;
                break;
            default: break;
        }

        if (event.code === "Space") combat.isShooting = true;

    }, { passive: false });

    window.addEventListener("keyup", (event) => {

        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            event.preventDefault();
        }

        let key = event.key;

        switch (key) {
            case "ArrowUp": key = "w"; break;
            case "ArrowDown": key = "s"; break;
            case "ArrowLeft": key = "a"; break;
            case "ArrowRight": key = "d"; break;
            default: break;
        }

        switch (key) {
            case "w":
            case "s":
            case "a":
            case "d":
                movement[key] = false;
                break;
            default: break;
        }

        if (event.code === "Space") combat.isShooting = false;

    });

    window.addEventListener("mousemove", (event) => {

        if (event.target.id === "game") {

            combat.Muzzle_Direction = { x: event.offsetX, y: event.offsetY };

        }

    });

    window.addEventListener("mousedown", (event) => {

        if (event.button === 0) combat.isShooting = true;

    });

    window.addEventListener("mouseup", (event) => {

        if (event.button === 0) combat.isShooting = false;

    });

}