// bot.js
import 'dotenv/config';
import { io } from "socket.io-client";
import join from "./src/join.js";
import Do from "./src/Do.js";
import Log from "../shared/Log.js";

const DOMAIN = process.env.DOMAIN;
const Development = process.env.NODE_ENV === "development";

const botLimit = process.argv[2] || 6;

const actions = ["Up", "Right", "Down", "Left"];
const sockets = [];
const Tick = 128;

async function main() {
    let counter = 0;
    let action = "";

    setTimeout(async () => {
        if (botLimit < 1) return;

        const { map, player } = await join(Development, sockets, io, DOMAIN, botLimit);

        const config = {};

        config.playerEffectiveSpeed = player.speed / Tick * 60 * Tick;
        config.arrivalTime = map.width / config.playerEffectiveSpeed * 1000;
        config.gapTime = botLimit > 1 ? config.arrivalTime / botLimit : 0;
        config.sleepTime = config.arrivalTime - (botLimit - 1) * config.gapTime;

        console.log(config);

        Log(`${sockets.length} bot alive;`, "BotManager");
        if (sockets.length === 0) return;

        while (true) {
            action = actions[counter % actions.length];
            // Log(`${action}`);
            await Do(Development, sockets, action, config);
            counter++;
        }

    }, 3000);

}

main();