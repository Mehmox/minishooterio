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
const FPS = 60;
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
    leaderboard: [],
    players: {},
    bullets: {}
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
    //         console.log(`Socket ${socket.id} is reached the rate limited.`);
    //         socket.disconnect();
    //     }
    // });

    // setInterval(() => {
    //     socket._rateLimit.count = 0;
    //     socket._rateLimit.lastCheck = Date.now();
    // }, INTERVAL);

    console.log(`id: ${socket.id} joined.`);

    Game.players[socket.id] = new Player(socket.id, FPS, ENV, Game_settings, nick);

    Game.leaderboard.push({ KDA: Game.players[socket.id].KDA, nick: Game.players[socket.id].userName, id: Game.players[socket.id].self });

    socket.emit("login", { id: socket.id, game: Game_settings, ENV });

    socket.on("ping", (res) => {

        if (typeof (res) === "function") res();

    });

    socket.on("movement", (direction) => Game.players[socket.id].direction = direction);


    const self = Game.players[socket.id];

    socket.on("combat", (combat) => {

        self.combat = {
            ...self.combat,
            isShooting: combat.isShooting,
            AMMO_CLIENT_POS: combat.Muzzle_Direction
        }

    });


    socket.on("disconnect", () => {

        delete Game.players[socket.id];

        for (let i = 0; i < Game.leaderboard.length; i++) {

            const player = Game.leaderboard[i];

            if (player.id === socket.id) Game.leaderboard.splice(i, 1);

        }

        for (const bulletId in Game.bullets) {

            const bullet = Game.bullets[bulletId];

            if (bullet.owner === socket.id) delete Game.bullets[bulletId];

        }

        console.log(`id: ${socket.id} disconnected.`);

    });

});


GameLoop(FPS, io, Game);

server.listen(PORT, () => console.log(`Lisstening on Port: ${PORT}!`));