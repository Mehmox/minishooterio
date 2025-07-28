const SnapshotManagerClass = require("../snapshot/SnapshotManager");
const EntitieslManager = require("../managers/EntityManager");
const InpustManager = require("../managers/InputManager");
const tickloop = require("./Tick");

const maxPlayer = 32;

const Tick = 128;
const snapshotHz = 64;

const GameState = {
    players: new Map(),
    bullets: new Map(),
    KDA: [],
    leaderboard: [],
}

// const snapshotList = new Map();

module.exports = function Game(io, ENV) {

    const SnapshotManager = new SnapshotManagerClass(io, GameState);

    const EntityPool = new EntitieslManager(maxPlayer, ENV, Tick, SnapshotManager);

    const Inputs = new InpustManager(io, EntityPool, GameState, snapshotHz, maxPlayer);

    tickloop(GameState, EntityPool, 1000 / Tick, Tick / snapshotHz, SnapshotManager);

}