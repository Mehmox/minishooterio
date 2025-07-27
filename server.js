//server.js
const express = require("express");
const http = require("http")
const { Server } = require("socket.io");
const PORT = 3000;
const ENV = process.env.NODE_ENV;

const Player = require("./src/Player");
const Update = require("./src/Update");
const Game_settings = require("./src/Game_settings");
Game_settings.mapId = Math.floor(Math.random() * 3) + 1;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

const Game = {
    players: {},
    bullets: []
}

io.use((socket, next) => {
    socket._rateLimit = { count: 0, lastCheck: Date.now() };
    next();
});

const RATE_LIMIT = 20; // saniyede max 20 mesaj
const INTERVAL = 1000; // 1 saniye

io.on("connect", (socket) => {
    setInterval(() => {
        socket._rateLimit.count = 0;
        socket._rateLimit.lastCheck = Date.now();
    }, INTERVAL);

    console.log(`id: ${socket.id} joined.`);

    Game.players[socket.id] = new Player(socket.id, Game_settings, ENV);

    socket.emit("login", { id: socket.id, game: Game_settings });

    // socket.use(() => {
    //     socket._rateLimit.count++;
    //     if (socket._rateLimit.count > RATE_LIMIT) {
    //         console.log(`Socket ${socket.id} is reached the rate limited.`);
    //         socket.disconnect();
    //     }
    // });

    socket.on("movement", (direction) => {
        Game.players[socket.id].direction = direction;
    });

    socket.on("combat", (combat) => {
        if (combat.isShooting) Game.players[socket.id].fire(combat.target);
    });

    socket.on("disconnect", () => {
        delete Game.players[socket.id]
        console.log(`id: ${socket.id} disconnected.`);
    });
});

setInterval(() => Update(io, Game, ENV), 1000 / 60);

server.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
});