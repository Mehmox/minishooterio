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

        this.updateAOI = updateAOI;
        this.positioner = positioner;
        this.byteCalculater = byteCalculater;
        this.encoder = encoder;
        this.sender = sender;

    }

    send(GameTick, snapshotms, Pool, players, bullets) {
        if (GameTick % snapshotms !== 0) return;

        this.updateAOI(players, bullets);

        const targets = this.positioner(Dirty, Pool);
        if (Object.keys(targets).length === 0) return;

        const deltaBufferSizes = this.byteCalculater(targets, Dirty, write_schema);

        const GameBuffer = this.encoder(targets, deltaBufferSizes, Dirty, write_schema);

        this.sender(GameBuffer, this.io.sockets.sockets);//sending encoded data to all clients 

        // Dirty.clear();

    }

}