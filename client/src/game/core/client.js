
import Gamestate from '../utils/LinkedList.js';
import Tick from './Tick.js';
import Listeners from "../input/listeners.js";
import { Inputs, Ping } from "./Timers.js";
import snapshotManager from "../snapshot/snapshotManager.js";

import Start from '../utils/Check.js';
import user from '../utils/User.js';
import EntitiesManager from "../utils/EntityManager.js";

const system = {
    SnapshotDelta: 0,
    lastSnapshotTime: 0,
    renderId: 0,
    lineWidth: 0.3,
    lineGap: 30,
}
let EntityPool;

export default function client(
    { socket, canvas, map },
    ENV, data, options, setTabs) {

    user.clear();
    Gamestate.clear();
    Start.clear();

    const ctxg = canvas.getContext("2d");
    const ctxm = map.getContext("2d");

    const bg = options[0].value ? "Black" : "White";
    canvas.style.backgroundColor = bg;
    map.style.backgroundColor = bg;
    data.ping.current.style.color = options[0].value ? "White" : "Black";
    data.net.current.style.color = options[0].value ? "White" : "Black";

    Start.set(() => Tick(system, user, ctxg, ctxm, Gamestate, map, options, canvas));

    const inputInterval = Inputs(socket, user);

    const pingInterval = Ping(socket, data);

    socket.once("login", ({ delta, id, settings, nick, maxPlayer }) => {

        system.SnapshotDelta = delta;
        user.id = id;
        user.nick = nick;
        user.bulletsize = settings.bullet.size;
        user.size = settings.player.size;
        user.bulletsizeDefault = settings.bullet.size;
        user.sizeDefault = settings.player.size;
        user.combat.fireRate = settings.player.fireRate;

        map.width = settings.map.width;
        map.height = settings.map.height;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        EntityPool = new EntitiesManager(maxPlayer, settings);

        Start.check(1);

    });

    socket.on("tick", (snapshot) => {

        system.lastSnapshotTime = performance.now();

        if (Gamestate.next) Gamestate.update();

        snapshotManager.update(Gamestate.next, snapshot)

        data.net.current.innerText = `Packets: ${snapshot.byteLength} bytes`;

        Start.check(2);

    });

    const clearListener = Listeners(user, canvas, setTabs, system);

    return () => {
        socket.off("tick", Tick);
        cancelAnimationFrame(system.renderId);
        clearInterval(inputInterval);
        clearInterval(pingInterval);
        clearListener();
        console.log("Client cleared!");
    }

}