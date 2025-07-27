//listeners.js
export default function Listeners(client) {

    const movement = client.events.movement;
    const combat = client.events.combat;

    window.addEventListener("keydown", (event) => {

        if (event.key === "w" || event.key === "s" || event.key === "a" || event.key === "d") movement[event.key] = true;

        if (event.code === "Space") combat.isShooting = true;

    });

    window.addEventListener("keyup", (event) => {

        if (event.key === "w" || event.key === "s" || event.key === "a" || event.key === "d") movement[event.key] = false;

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