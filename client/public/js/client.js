//client.js

import Print from "./Print/printer.js";
import Listeners from "./listeners.js";
import is_Game_Ready from './ready.js';

const socket = io();
const canvas = document.getElementById("game");
const score = document.getElementById("score");
const divs = document.querySelectorAll("div");
const fireSound = new Audio("../assets/sounds/rifle2.mp3");
fireSound.volume = 0.05;

canvas.style.backgroundRepeat = "no-repeat";

const ctx = canvas.getContext("2d");

let Game = {}
const client = {
    isShooting: false,
    lastShoot: Date.now(),
    fireRate: null,
    target: null,
    w: false,
    s: false,
    a: false,
    d: false,
    lastDirection: "",
    self: null,
}
Listeners(client);

socket.once("login", (data) => {

    client.self = data.id;
    client.pov = data.game.pov;
    client.fireRate = data.game.fireRate;

    canvas.width = client.pov.width;
    canvas.height = client.pov.height;
    canvas.style.backgroundImage = `url("/assets/images/Map${data.game.mapId}.png")`;
    canvas.style.backgroundSize = `${data.game.width + client.pov.width}px ${data.game.height + client.pov.height}px`;

    divs.forEach((div) => {
        div.style.width = client.pov.width / 2 + "px";
        div.style.height = client.pov.height + "px";
    });

    is_Game_Ready(Loop);

});

socket.on("update", (game_data) => {

    Game = game_data;

    is_Game_Ready(Loop);

});

function Loop() {

    var direction = ""

    if (client.w) direction += "up";
    if (client.d) direction += "right";
    if (client.s) direction += "down";
    if (client.a) direction += "left";

    if (client.lastDirection !== direction) {

        client.lastDirection = direction;

        socket.emit("movement", direction);

    }

    if (Date.now() >= client.lastShoot && client.isShooting) {

        fireSound.currentTime = 0;
        fireSound.play();

        client.lastCombat = client.isShooting;

        client.lastShoot = Date.now() + 1000 / client.fireRate;

        socket.emit("combat", { target: client.target });

    }

    if (Game.players) Print(ctx, canvas, Game.players, client);

    score.innerHTML = "";
    Game.leaderboard.forEach(player => {

        let newLi = document.createElement("li");

        newLi.innerText = `${player.KDA.kill}/${player.KDA.dead}/${player.KDA.assist} ${player.nick}`;

        score.append(newLi);

    });

    // requestAnimationFrame(Loop);

}

setInterval(Loop, 1000 / 60);