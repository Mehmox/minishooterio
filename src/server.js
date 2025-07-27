//server.js
const testNicks = ["Mehmox", "Eraye", "Yuuko", "Jack", "Emrecan"];
const express = require("express");
const http = require("http")
const { Server } = require("socket.io");
const PORT = 3000;
const ENV = process.env.NODE_ENV;

const Player = require("./class/Player");
const Update = require("./Update/Update");
const Game_settings = require("./Game_settings");
Game_settings.mapId = Math.floor(Math.random() * 3) + 1;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("client/public"));

const Game = {
    leaderboard: [],
    players: {},
    bullets: {}
}

io.use((socket, next) => {
    socket._rateLimit = { count: 0, lastCheck: Date.now() };
    next();
});
let test = 0;
const RATE_LIMIT = 20; // saniyede max 20 mesaj
const INTERVAL = 1000; // 1 saniye

io.on("connect", (socket) => {

    // socket.use(() => {
    //     socket._rateLimit.count++;
    //     if (socket._rateLimit.count > RATE_LIMIT) {
    //         console.log(`Socket ${socket.id} is reached the rate limited.`);
    //         socket.disconnect();
    //     }
    // });

    setInterval(() => {
        socket._rateLimit.count = 0;
        socket._rateLimit.lastCheck = Date.now();
    }, INTERVAL);

    console.log(`id: ${socket.id} joined.`);

    Game.players[socket.id] = new Player(socket.id, ENV, Game_settings, testNicks[test]);
    test++;
    Game.leaderboard.push({ KDA: Game.players[socket.id].KDA, nick: Game.players[socket.id].userName, id: Game.players[socket.id].self });

    socket.emit("login", { id: socket.id, game: Game_settings });

    socket.on("movement", (direction) => Game.players[socket.id].direction = direction);


    const self = Game.players[socket.id];

    socket.on("combat", (combat) => {

        if (combat.target !== null) {

            const serverPos = {
                x: self.position.x + (combat.target.x - self.pov.width / 2),
                y: self.position.y + (combat.target.y - self.pov.height / 2),
            }

            Game.players[socket.id].fire(Game.bullets, serverPos);

        }

    });


    socket.on("disconnect", () => {

        delete Game.players[socket.id];

        for (let i = 0; i < Game.leaderboard.length; i++) {

            const player = Game.leaderboard[i];

            if (player.id === socket.id) Game.leaderboard.splice(i, 1);

        }

        // test--;

        console.log(`id: ${socket.id} disconnected.`);

    });

});

setInterval(() => Update(io, Game), 1000 / 60);

server.listen(PORT, () => console.log(`Sunucu ${PORT} portunda çalışıyor`));