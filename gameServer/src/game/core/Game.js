import SnapshotManagerClass from "../snapshot/SnapshotManager.js";
import EntityManager from "../managers/EntityManager.js";
import InpustManager from "../managers/InputManager.js";
import tickloop from "./Tick.js";

const GameState = {
    players: new Map(),
    bullets: new Map(),
    KDA: [],
    leaderboard: [],
}

export default function Game(state, io, maxPlayer, Tick, snapshotHz) {

    EntityManager.set(maxPlayer, Tick);

    const SnapshotManager = new SnapshotManagerClass(io);

    const Inputs = new InpustManager(io, EntityManager, GameState, snapshotHz, maxPlayer);

    tickloop(state, GameState, EntityManager, Tick, Tick / snapshotHz, SnapshotManager);

}