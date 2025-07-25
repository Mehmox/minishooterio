const encode = require("../net/encoder");

module.exports = class SnapshotManager {

    constructor(io, Game) {

        this.io = io;
        this.Game = Game.players;

    }

    send(GameTick, snapshotms) {

        if (GameTick % snapshotms !== 0) return;

        //sending all clients encoded data
        this.io.sockets.sockets.get(player.socket_id).emit("tick", encode(player, this.Game.size));

    }

}