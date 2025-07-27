//server.js
const express = require("express");
const http = require("http")
const { Server } = require("socket.io");
const PORT = 3000;

const Player = require("./src/Player");
const Update = require("./src/Update");
const Game = require("./src/Game");
const players = {}

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connect", (socket) => {
    console.log(`id: ${socket.id} joined.`);
    socket.emit("login", socket.id);

    players[socket.id] = new Player(socket.id, Game.width, Game.height);

    socket.on("movement", (direction) => {
        players[socket.id].direction = direction;
    });

    socket.on("disconnect", () => {
        delete players[socket.id]
        console.log(`id: ${socket.id} disconnected.`)
    });
});

setInterval(() => Update(io, players), 1000 / 60);

server.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
});