//Tick.js
// import Efficiency from "../../ztools/Efficiency.js";
// import { leech, leechAsync } from "../../ztools/leech.js";

import safeExecute from "../utils/safeExecute.js";
import moveBullets from "../mechanics/moveBullets.js";
import movePlayers from "../mechanics/movePlayers.js";
import fire from "../mechanics/fire.js";
import damage from "../mechanics/damage.js";
import Log from "../../../../shared/Log.js";

// const Checker = new Efficiency();

let GameTick = 0;
let Last_Update_Time = 0;

export default function tickloop(state, GameState, EntityManager, Tick, snapshotms, SnapshotManager) {

    function Update() {

        if (state.gameEnd) {
            Log(`Server tick loop returns`, "Server");
            return;
        }

        const ms = 1000 / Tick;
        const now = performance.now();
        const delta = now - Last_Update_Time;

        if (delta >= ms) {

            GameTick++;

            // Checker.check(GameTick);

            const players = GameState.players;
            const bullets = GameState.bullets;

            Last_Update_Time = now;

            //bullet position update
            safeExecute("moveBullets", () => moveBullets(bullets, GameTick, EntityManager));
            //player position update
            safeExecute("movePlayers", () => movePlayers(players));
            //generate bullet update
            safeExecute("fire", () => fire(GameState, EntityManager, players, GameTick, Tick));
            //player/bullet collision update
            safeExecute("damage", () => damage(bullets, players));
            //updated GameState data send to all clients
            SnapshotManager.send(GameTick, snapshotms, EntityManager, players, bullets);

            // leech(30_000_00);

            if (GameState.players.size > 0)
                setImmediate(Update);
            else
                setTimeout(Update, 250);

        } else setImmediate(Update);

    }

    Update();

}