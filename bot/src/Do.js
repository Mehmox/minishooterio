import sleep from "./sleep.js";
import Log from "../../shared/Log.js";

let ping;
const radius = 10;
const speed = Math.PI / 2;
let angle = Math.PI;


export default async function Do(Development, sockets, action, config) {
    ping = 0;
    angle += speed;

    for (let i = 0; i < sockets.length; i++) {

        sockets[i].emit("combat", {
            isShooting: false,
            Muzzle_Direction: { x: 1920 / 2 + Math.cos(angle) * radius, y: 925 / 2 + Math.sin(angle) * radius },
            direction: action,
        });

        if (i + 1 < sockets.length) await sleep(config.gapTime);

    }

    if (!Development) {

        for (let i = 0; i < sockets.length; i++) {
            const start = performance.now();

            sockets[i].emit("ping", () => {
                ping += (performance.now() - start).toFixed(0);
            });
        }

        Log(`Ping: ${(ping / sockets.length).toFixed(0)};`, "BotManager");

    }

    await sleep(config.sleepTime);

}