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
    //         console.log(`Socket ${player.self} is reached the rate limited.`);
    //         socket.disconnect();
    //     }
    // });

    // setInterval(() => {
    //     socket._rateLimit.count = 0;
    //     socket._rateLimit.lastCheck = Date.now();
    // }, INTERVAL);

    
    const player = new Player(FPS, ENV, Game_settings, nick);
    
    Game.players[player.self] = player;

    console.log(`id: ${player.self} joined.`);

    Game.leaderboard.push({ KDA: Game.players[player.self].KDA, nick: Game.players[player.self].userName, id: Game.players[player.self].self });

    socket.emit("login", { id: player.self, game: Game_settings, ENV });

    socket.on("movement", (direction) => Game.players[player.self].direction = direction);


    const self = Game.players[player.self];

    socket.on("combat", (combat) => {

        self.combat = {
            ...self.combat,
            isShooting: combat.isShooting,
            AMMO_CLIENT_POS: combat.Muzzle_Direction
        }

    });


    socket.on("disconnect", () => {

        delete Game.players[player.self];

        for (let i = 0; i < Game.leaderboard.length; i++) {

            const player = Game.leaderboard[i];

            if (player.self === player.self) Game.leaderboard.splice(i, 1);

        }

        for (const bulletId in Game.bullets) {

            const bullet = Game.bullets[bulletId];

            if (bullet.owner === player.self) delete Game.bullets[bulletId];

        }

        console.log(`id: ${player.self} disconnected.`);

    });

});


GameLoop(FPS, io, Game);

server.listen(PORT, () => console.log(`Lisstening on Port: ${PORT}!`));