import PrintGame from "../draw/drawGame.js";

import Listeners from "../input/listeners.js";
import Check from './Check.js';
import LinkedList from './LinkedList.js';
import decoder from "../net/decoder.js"

const Start = new Check();

let SnapshotDelta, lastSnapshotTime;
const player = new LinkedList();
let animationId;

const user = {
    movement: { KeyW: false, KeyA: false, KeyS: false, KeyD: false, },
    combat: { isShooting: false, fireRate: null, Muzzle_Direction: null, ShootCoolDown: 0, },
}
let max = 0;

export default function client(
    { socket, canvas, map },
    data, options, setTabs, setTest) {

    user.movement = { KeyW: false, KeyA: false, KeyS: false, KeyD: false };
    user.combat = { isShooting: false, fireRate: null, Muzzle_Direction: null, ShootCoolDown: 0 };
    player.clear();
    Start.clear();

    const ctxg = canvas.getContext("2d");
    const ctxm = map.getContext("2d");

    const bg = options[0].value ? "Black" : "White";
    canvas.style.backgroundColor = bg;
    map.style.backgroundColor = bg;
    data.ping.current.style.color = options[0].value ? "White" : "Black";
    data.net.current.style.color = options[0].value ? "White" : "Black";

    const movement = user.movement;
    let direction = "";

    function Update() {

        direction = "";

        if (movement.KeyW) direction += "Up";
        if (movement.KeyA) direction += "Left";
        if (movement.KeyS) direction += "Down";
        if (movement.KeyD) direction += "Right";

        if (player.prev) {

            const now = performance.now();

            // if (now - lastSnapshotTime > max) {
            //     max = now - lastSnapshotTime
            //     console.log(max)
            //     console.log({ after: now, before: lastSnapshotTime })
            // }

            const t = Math.min(1, (now - lastSnapshotTime) / SnapshotDelta);
            // console.log("looping!", t);
            PrintGame({ ctxg, ctxm }, player, map, options[0].value, user, t);

        }

        animationId = requestAnimationFrame(Update);

    }

    function Tick(game_data) {

        data.net.current.innerText = `Packets: ${game_data.byteLength} bytes`;

        player.refresh(decoder(game_data));

        lastSnapshotTime = performance.now();

        data.leaderboard = player.next.leaderBoard;

        Start.check(2);

    }

    const inputInterval = setInterval(() => {

        socket.emit("combat", { isShooting: user.combat.isShooting, Muzzle_Direction: user.combat.Muzzle_Direction, direction });

    }, 1000 / 20);

    const pingInterval = setInterval(() => {

        const now = performance.now();

        socket.emit("ping", () => {

            const end = performance.now();

            data.ping.current.innerText = `Ping: ${Math.ceil((end - now) / 2)} ms`;

        });

    }, 400);

    Start.set(Update);

    socket.once("login", ({ delta, id, settings, nick }) => {

        SnapshotDelta = delta;
        user.id = id;
        user.nick = nick;
        user.bulletsize = settings.player.combat.size;
        user.size = settings.player.stats.size;
        user.pov = settings.player.pov;
        user.combat.fireRate = settings.fireRate;
        user.combat.Muzzle_Direction = { x: user.pov.width, y: user.pov.height / 2 };

        map.width = settings.width;
        map.height = settings.height;

        canvas.width = user.pov.width;
        canvas.height = user.pov.height;

        Start.check(1);

    });

    socket.on("tick", (game_data) => Tick(game_data));

    const ClearListener = Listeners(user, data.lerp,canvas, setTest, { setTabs });

    return () => {
        socket.off("tick", Tick);
        clearInterval(inputInterval)
        clearInterval(pingInterval)
        cancelAnimationFrame(animationId);
        ClearListener();
        console.log("Client cleared!");
    }

}