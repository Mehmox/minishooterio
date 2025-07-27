//client.js

import PrintGame from "./Print/printerGame.js";
import PrintMap from "./Print/printerMap.js";
import Listeners from "./listeners.js";
import Check from './class/Check.js';
import Ses from "./test.js";

const Start = new Check();
const fireSound = new Audio("/assets/sounds/rifle2.mp3");
fireSound.volume = 0.05;

// Ses();


let Game = {}
const user = {
    self: null,
    events: {
        movement: {
            w: false,
            d: false,
            s: false,
            a: false,
        },
        combat: {
            isShooting: false,
            fireRate: null,
            Muzzle_Direction: null,
            ShootCoolDown: 0,
        },
    },

}

export default function client(socket, mapDiv, map, canvas, score, setLeaderBoard) {

    canvas.style.backgroundRepeat = "no-repeat";
    map.style.backgroundRepeat = "no-repeat";

    const ctxg = canvas.getContext("2d");
    const ctxm = map.getContext("2d");


    const movement = user.events.movement;
    const combat = user.events.combat;
    let direction = ""

    function Update() {

        direction = ""

        if (movement.w) direction += "Up";
        if (movement.d) direction += "Right";
        if (movement.s) direction += "Down";
        if (movement.a) direction += "Left";

        const now = performance.now()

        if (now >= combat.ShootCoolDown && combat.isShooting) {

            fireSound.currentTime = 0;
            // fireSound.play();

            combat.ShootCoolDown = now + 1000 / combat.fireRate;

        }

        if (Game.players) {

            PrintGame(ctxg, canvas, Game.players, user);

            PrintMap(ctxm, map, Game.players[user.self].position, Game.players[user.self].stats.size, Game.players[user.self].pov);

        }

        requestAnimationFrame(Update);

    }

    setInterval(() => {

        socket.emit("movement", direction);

        socket.emit("combat", { isShooting: user.events.combat.isShooting, Muzzle_Direction: user.events.combat.Muzzle_Direction });

    }, 1000 / 20);

    Start.set(Update);

    socket.on("login", (data) => {

        user.self = data.id;
        user.pov = data.game.player.pov;
        user.events.combat.fireRate = data.game.fireRate;
        user.events.combat.Muzzle_Direction = { x: user.pov.width, y: user.pov.height / 2 };


        mapDiv.style.width = user.pov.width / 2 + "px";
        mapDiv.style.height = user.pov.height + "px";

        map.width = data.game.width;
        map.height = data.game.height;


        canvas.width = user.pov.width;
        canvas.height = user.pov.height;
        canvas.style.backgroundImage = `url("/assets/images/Map${data.ENV !== "production" ? 1 : data.game.mapId}.png")`;
        canvas.style.backgroundSize = `${data.game.width + user.pov.width}px ${data.game.height + user.pov.height}px`;


        score.style.width = user.pov.width / 2 + "px";
        score.style.height = user.pov.height + "px";

        Start.check(1);

    });

    socket.on("update", (game_data) => {

        Game = game_data;

        if (Game.leaderboard) setLeaderBoard(Game.leaderboard);

        Start.check(2);

    });

    Listeners(user);

}