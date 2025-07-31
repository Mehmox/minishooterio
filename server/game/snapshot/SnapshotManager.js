//SnapshotManager.js
const updateAOI = require("./updateAOI");
const positioner = require("./positioner");
const byteCalculater = require("./byteCalculater");
const encoder = require("./encoder");
const sender = require("./sender");
const Dirty = require("../utils/Dirty");

const decoder = require("../../../.tests/decoder.mjs").default;//test

module.exports = class SnapshotManager {

    constructor(io, Game) {

        this.io = io;
        this.Game = Game.players;

    }

    send(GameTick, snapshotms, Pool, players, bullets) {
        if (GameTick % snapshotms !== 0) return;

        updateAOI(players, bullets);

        if (Dirty.size === 0) return;

        const targets = positioner(Dirty, Pool.player);

        if (Object.keys(targets).length === 0) return;

        const deltaBufferSizes = byteCalculater(targets, Dirty);

        const GameBuffer = encoder(targets, deltaBufferSizes, Dirty);

        // decoder(GameBuffer)//test

        sender(GameBuffer, this.io.sockets.sockets);

        Dirty.clear();

    }

}