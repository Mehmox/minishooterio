//client.js
import Print from "./printer.js"
import Listeners from "./listeners.js";

const socket = io();
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 1080;
canvas.height = 720;
ctx.lineWeight = 5;

let Players = {}
socket.on("update", (data) => {
    Players = data
});

const player = {
    fire: false,
    w: false,
    s: false,
    a: false,
    d: false,
    lastDirection: "",
    self: null,
}
Listeners(player)

socket.on("login", (socket_id) => {
    player.self = socket_id
});


function Update() {
    var direction = ""

    if (player.w) direction += "up";
    if (player.d) direction += "right";
    if (player.s) direction += "down";
    if (player.a) direction += "left";

    if (player.lastDirection !== direction) {
        player.lastDirection = direction;
        socket.emit("movement", direction);
    }



    Print(ctx, Players, player.self);

    requestAnimationFrame(Update);
}

requestAnimationFrame(Update);