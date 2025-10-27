//SnapshotManager.js
import updateAOI from "./updateAOI.js";
import positioner from "./positioner.js";
import byteCalculater from "./byteCalculater.js";
import encoder from "./encoder.js";
import sender from "./sender.js";
import Dirty from "../utils/Dirty.js";
import Logger from "../utils/Logger.js";
import Log from "../../../../shared/Log.js";

interface io {
    [sockets: string]: { [sockets: string]: { length: number } };
}

interface Player {
    type: "Player";
    id: number;
    socket_id: string;
    seenEnemys: Set<number>;
}

interface Bullet {
    type: "Bullet";
    id: number;
    seenBy: Set<number>;
}

interface EntityManager {
    pool: { [key: number]: Player | Bullet };
    release: Function;
}

type targetMap = {
    [id: number]: {
        trackeds: number[],
        socket_id: string
    };
}

type snapshot = {
    [key: number]: {
        buffer: Buffer;
        socket_id: string;
    }
}

export default class SnapshotManager {

    io: io;

    constructor(io: io) {

        this.io = io as io;

    }

    send(GameTick: number, snapshotms: number, EntityManager: EntityManager, players: Map<number, object>, bullets: Map<number, object>): void {
        if (GameTick % snapshotms !== 0) return;

        updateAOI(players, bullets);

        if (Dirty.size === 0) return;

        const targetMap: targetMap = positioner(Dirty, EntityManager);

        if (Object.keys(targetMap).length === 0) return;
        // console.log("\ntargetMap: ");
        // console.log(targetMap);

        const deltaBufferSizes: { [key: number]: number } = byteCalculater(targetMap, Dirty);
        // console.log("deltaBufferSizes: ");
        // console.log(deltaBufferSizes);

        const GameBuffer: snapshot = encoder(targetMap, deltaBufferSizes, Dirty);
        // console.log("GameBuffer: ");
        // console.log(GameBuffer);

        const invalidSockets = sender(GameBuffer, this.io.sockets.sockets) as Array<number> | false;

        if (invalidSockets) {

            invalidSockets.forEach(instance_id => {

                const player = EntityManager.pool[instance_id] as Player;

                players.delete(player.id);

                EntityManager.release(player);

                Logger(player, "disconnected");

                Log(`${players.size} player online!`);

            });

            this.send(GameTick, snapshotms, EntityManager, players, bullets);

        }

        Dirty.clear();

    }

}