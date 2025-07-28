//SnapshotManager.js
const updateAOI = require("../utils/updateAOI");
const positioner = require("./positioner");
const byteCalculater = require("./byteCalculater");
const encoder = require("./encoder");
const sender = require("./sender");
const Dirty = require("../utils/Dirty");
const { write_schema } = require("../../../client/src/shared/BufferShema");

module.exports = class SnapshotManager {

    constructor(io, Game) {

        this.io = io;
        this.Game = Game.players;

    }

    send(GameTick, snapshotms, Pool, players, bullets) {
        if (GameTick % snapshotms !== 0) return;

        updateAOI(players, bullets);

        const targets = positioner(Dirty, Pool);
        if (Object.keys(targets).length === 0) return;

        const deltaBufferSizes = byteCalculater(targets, Dirty, write_schema);

        const GameBuffer = encoder(targets, deltaBufferSizes, Dirty, write_schema);

        sender(GameBuffer, this.io.sockets.sockets);

        // Dirty.clear();

    }

}