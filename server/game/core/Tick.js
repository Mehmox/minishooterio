//Tick.js
const Efficiency = require("../../../.tools/Efficiency");
const { leech, leechAsync } = require("../../../.tools/leech");

const safeExecute = require("../utils/safeExecute");
const moveBullets = require("../mechanics/moveBullets");
const movePlayers = require("../mechanics/movePlayers");
const fire = require("../mechanics/fire");
const damage = require("../utils/damage");

const ENV = process.env.ENV;
let GameTick = 0;
let Last_Update_Time = 0;

module.exports = function tickloop(GameState, Pool, ms, snapshotms, SnapshotManager) {

    function Update() {

        const now = performance.now();
        const delta = now - Last_Update_Time;

        if (delta >= ms) {

            // Efficiency.check();

            const players = GameState.players;
            const bullets = GameState.bullets;

            Last_Update_Time = now;

            GameTick++;
            // console.log(`Looping! Tick: ${GameTick}`)
            //bullet position update
            safeExecute("moveBullets", () => moveBullets(bullets, now));
            //player position update
            safeExecute("movePlayers", () => movePlayers(players));
            //generate bullet update
            // safeExecute("fire", () => fire(GameState, Pool, players, now));
            //player/bullet collision update
            safeExecute("damage", () => damage(bullets, players));
            //update leaderBoard
            //updated GameState data send to all clients
            safeExecute("SnapshotManager", () => SnapshotManager.send(GameTick, snapshotms, Pool.pool, players, bullets));

            // leech(30_000_000);

            // Efficiency.check();

            if (GameState.players.size > 0)
                setImmediate(Update);
            else
                setTimeout(Update, 1000);


        } else setImmediate(Update);

    }

    Update();

}