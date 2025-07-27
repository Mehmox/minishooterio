//client.js
import Print from "./printer.js"
import Listeners from "./listeners.js";

const socket = io();
const canvas = document.getElementById("game");
const score = document.getElementById("score");
const divs = document.querySelectorAll("div");

canvas.style.backgroundRepeat = "no-repeat";

const ctx = canvas.getContext("2d");
ctx.lineWeight = 5;

let Game = {}
socket.on("update", (game_data) => {
    Game = game_data;
});

const player = {
    isShooting: false,
    lastShoot: Date.now(),
    target: null,
    w: false,
    s: false,
    a: false,
    d: false,
    lastDirection: "",
    self: null,
}
Listeners(player);

socket.on("login", (data) => {
    player.self = data.id;
    player.pov = data.game.pov;
    canvas.width = player.pov.width;
    canvas.height = player.pov.height;
    divs.forEach((div) => {
        div.style.width = player.pov.width / 2 + "px";
        div.style.height = player.pov.height + "px";
    });
    canvas.style.backgroundImage = `url("/assets/Map${data.game.mapId}.png")`;
    canvas.style.backgroundSize = `${data.game.width + player.pov.width}px ${data.game.height + player.pov.height}px`;
    requestAnimationFrame(Update);
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


    if (Date.now() >= player.lastShoot && player.target !== null) {
        player.lastShoot = Date.now() + 1000 / 20;
        socket.emit("combat", { isShooting: player.isShooting, target: player.target });
    }

    if (Game.players) Print(ctx, canvas, player, Game.players);

    requestAnimationFrame(Update);
}