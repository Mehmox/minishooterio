//client.js

import PrintGame from "./Draw/drawGame.js";
import PrintMap from "./Draw/drawMap.js";
import Listeners from "./listeners.js";
import Check from './class/Check.js';
import decoder from "./decoder.js"
// import Ses from "./test.js";

const Start = new Check();
// const fireSound = new Audio("/assets/sounds/rifle2.mp3");
// fireSound.volume = 0.05;

// Ses();


let player = {}
const user = {
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

export default function client(socket, mapDiv, scoreDiv, map, canvas, score, ping, byte, setLeaderBoard) {

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

            // fireSound.currentTime = 0;
            // fireSound.play();

            combat.ShootCoolDown = now + 1000 / combat.fireRate;

        }

        if (player) {

            PrintGame(ctxg, canvas, player, user);

            PrintMap(ctxm, map, player, user);

        }

        requestAnimationFrame(Update);

    }

    setInterval(() => {

        socket.emit("combat", { isShooting: user.events.combat.isShooting, Muzzle_Direction: user.events.combat.Muzzle_Direction, direction });

    }, 1000 / 20);

    setInterval(() => {

        const now = performance.now();

        socket.emit("ping", () => {

            const end = performance.now();

            ping.innerHTML = `Ping: ${((end - now) / 2).toFixed(0)}`;

        });

    }, 400);

    Start.set(Update);

    socket.on("login", ({ id, settings, ENV, nick }) => {

        user.id = id;
        user.nick = nick;
        user.bulletsize = settings.player.combat.size;
        user.size = settings.player.stats.size;
        user.pov = settings.player.pov;
        user.events.combat.fireRate = settings.fireRate;
        user.events.combat.Muzzle_Direction = { x: user.pov.width, y: user.pov.height / 2 };


        mapDiv.style.width = user.pov.width / 2 + "px";
        mapDiv.style.height = user.pov.height + "px";
        scoreDiv.style.width = user.pov.width / 2 + "px";
        scoreDiv.style.height = user.pov.height + "px";

        map.width = settings.width;
        map.height = settings.height;


        canvas.width = user.pov.width;
        canvas.height = user.pov.height;
        canvas.style.backgroundImage = `url("/assets/images/Map${ENV !== "production" ? 1 : settings.mapId}.png")`;
        canvas.style.backgroundSize = `${settings.width + user.pov.width}px ${settings.height + user.pov.height}px`;


        score.style.width = user.pov.width / 2 + "px";
        score.style.height = user.pov.height + "px";

        Start.check(1);

    });

    socket.on("tick", (game_data) => {

        byte.innerHTML = `Packets: ${game_data.byteLength} bytes`

        player = decoder(game_data);

        setLeaderBoard(player.leaderBoard);

        Start.check(2);

    });

    Listeners(user, socket);

}