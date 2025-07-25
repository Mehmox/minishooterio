const path = require("path");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);

const Routes = require("./API/Routes");
const Game = require("./game/core/Game");

const PORT = process.argv[2] || process.env.PORT;
const ENV = process.env.NODE_ENV;

const io = new Server(server, {
    cors: {
        origin: '*', // İstemcinin çalıştığı adres
        methods: ['GET', 'POST']
    }
});

app.use("/", Routes);

if (ENV !== "development") {

    app.use(express.static(path.join(__dirname, "../build")));

    // app.get("*", (req, res) => {
    //     res.sendFile(path.join(__dirname, "../build/index.html"));
    // });

    console.log("build served\n");

}

Game(io, ENV);

server.listen(PORT, () => console.log(`listening on port: ${PORT}`));