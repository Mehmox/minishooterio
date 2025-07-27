//listeners.js
export default function Listeners(client) {

    window.addEventListener("keydown", (event) => {

        if (event.key === "w" || event.key === "s" || event.key === "a" || event.key === "d") client[event.key] = true;

        if (event.code === "Space") client.isShooting = true;

    });

    window.addEventListener("keyup", (event) => {

        if (event.key === "w" || event.key === "s" || event.key === "a" || event.key === "d") client[event.key] = false;

        if (event.code === "Space") client.isShooting = false;

    });

    window.addEventListener("mousemove", (event) => {

        if (event.target.id === "game") client.target = { x: event.offsetX, y: event.offsetY };

    });

    window.addEventListener("mousedown", (event) => {

        if (event.button === 0) client.isShooting = true;

    });

    window.addEventListener("mouseup", (event) => {

        if (event.button === 0) client.isShooting = false;

    });

}