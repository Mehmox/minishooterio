//Server/index.js
import 'dotenv/config';
import fs from "fs";
import http from "node:http";
import https from "node:https";
import { Server } from "socket.io";

import Game from "./dist/game/core/Game.js";
import verify from './dist/API/verify.js';
import register from './dist/API/register.js';
import heartbeat from './dist/API/heartbeat.js';
import Log from '../shared/Log.js';

const Development = process.env.NODE_ENV === "development";
const TOKEN_KEY = process.env.TOKEN_KEY;
const DOMAIN_URI = process.env.DOMAIN_URI;
const SUB = process.env.SUB;
const PRIORITY = +process.env.SERVER_PRIORITY;

const PORT = process.argv[2] || 5001;
const maxPlayer = process.argv[3] || 32;
const Tick = process.argv[4] || 128;
const snapshotHz = process.argv[5] || 64;

const state = {
    gameEnd: false,
}

const config = {
    success: false,
    createServer: () =>
        Development ?
            http.createServer() :
            https.createServer({
                key: fs.readFileSync(`/etc/letsencrypt/live/${SUB}.mehmox.com/privkey.pem`),
                cert: fs.readFileSync(`/etc/letsencrypt/live/${SUB}.mehmox.com/fullchain.pem`)
            }),
    server: null,
    io: null,
}

async function main() {
    if (!Development) {
        config.success = await register(DOMAIN_URI, TOKEN_KEY, {
            SUB, PORT,
            count: 0,
            limit: maxPlayer,
            priority: PRIORITY,
            LTUpdate: performance.now(),
        });
    }

    if (config.success || Development) {

        config.server = config.createServer();

        config.io = new Server(config.server, {
            cors: {
                origin: `${Development ? "http://localhost:3000" : "*"}`,
                methods: ['GET', 'POST']
            }
        });

        if (!Development) {
            config.io.use(verify);
            heartbeat(DOMAIN_URI, TOKEN_KEY, { SUB, PORT, io: config.io });
        }

        Game(state, config.io, maxPlayer, Tick, snapshotHz);

        config.server.listen(PORT, () => Log(`Listening game server on port: ${PORT}`, "Server"));

    } else Log("Something went wrong server not conected", "Server");
}

main();