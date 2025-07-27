//server.js

const express = require("express");
const http = require("http")
const { Server } = require("socket.io");

const Player = require("./class/Player");
const GameLoop = require("./Update/Update");
const Game_settings = require("./Game_settings");
const path = require("path");

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV;
const FPS = 128;
Game_settings.mapId = Math.floor(Math.random() * 3) + 1;

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*', // İstemcinin çalıştığı adres
        methods: ['GET', 'POST']
    }
});

if (ENV !== "development") {

    console.log("build served");

    app.use(express.static(path.join(__dirname, "../build")));

    app.get("/Start", (req, res) => res.sendFile(path.join(__dirname, "../build/index.html")));

}


const Game = {
    players: {},
    bullets: {},
    KDA: [],
    leaderboard: [],
}

// io.use((socket, next) => {

//     socket._rateLimit = { count: 0, lastCheck: Date.now() };

//     next();

// });

const RATE_LIMIT = 20; // saniyede max 20 mesaj
const INTERVAL = 1000; // 1 saniye

io.on("connect", (socket) => {

    const { nick } = socket.handshake.query;

    // socket.use(() => {
    //     socket._rateLimit.count++;
    //     if (socket._rateLimit.count > RATE_LIMIT) {
    //         console.log(`Socket ${player.id} is reached the rate limited.`);
    //         socket.disconnect();
    //     }
    // });

    // setInterval(() => {
    //     socket._rateLimit.count = 0;
    //     socket._rateLimit.lastCheck = Date.now();
    // }, INTERVAL);

    const user = new Player(socket.id, FPS, ENV, Game_settings, nick);

    Game.players[user.id] = user;

    console.log(`"${user.userName}"[#${user.id}] joined.`);
    console.log(`\n${Object.keys(Game.players).length} player online!`);

    socket.emit("login", { id: socket.id, settings: Game_settings, ENV, nick: user.nick });

    Game.KDA[user.id] = { KDA: Game.players[user.id].KDA, nick: Game.players[user.id].userName };

    socket.on("ping", (res) => {

        if (typeof (res) === "function") res();

    });

    socket.on("combat", ({ isShooting, Muzzle_Direction, direction }) => {

        user.combat = {
            ...user.combat,
            isShooting,
            AMMO_CLIENT_POS: Muzzle_Direction
        }

        Game.players[user.id].direction = direction;

    });

    socket.on("disconnect", () => {

        delete Game.players[user.id];
        delete Game.KDA[user.id];

        Object.values(Game.bullets).forEach(bullet => {

            if (bullet.owner === user.id) delete Game.bullets[bullet.id];

        });

        console.log(`"${user.userName}"[#${user.id}] disconnected.`);
        console.log(`\n${Object.keys(Game.players).length} player online!`);

    });

});

GameLoop(FPS, io, Game);

server.listen(PORT, () => console.log(`listening on port: ${PORT}`));