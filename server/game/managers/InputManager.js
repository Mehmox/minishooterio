const respawn = require("../mechanics/respawn");
const game_settings = require("../../../game_settings.json");
const Logger = require("../utils/Logger");
const markDirty = require("../utils/markDirty");

module.exports = class InputManager {

    constructor(io, Pool, GameState, snapshotRate, maxPlayer) {

        io.on("connect", (socket) => {

            let { nick } = socket.handshake.query;

            if (nick === "undefined") nick = "";

            const player = Pool.acquirePlayer(nick, socket.id);

            respawn(player);

            markDirty(player.id, "nick", player.nick);
            markDirty(player.id, "health", player.health);
            markDirty(player.id, "x", player.x);
            markDirty(player.id, "y", player.y);

            GameState.players.set(player.id, player);

            Logger(player, socket, "joined");
            console.log(`\n${GameState.players.size} player online!`);

            socket.emit("login", { delta: 1000 / snapshotRate, id: player.id, settings: game_settings, nick: player.nick, maxPlayer });

            socket.on("ping", (fn) => {
                fn();
            });

            socket.on("combat", ({ isShooting, Muzzle_Direction, direction }) => {

                player.isShooting = isShooting;

                player.Muzzle_SERVER_X = player.x - 1920 / 2 + Muzzle_Direction.x;
                player.Muzzle_SERVER_Y = player.y - 925 / 2 + Muzzle_Direction.y;
                player.direction = direction;

            });

            socket.on("disconnect", () => {

                Logger(player, socket, "disconnected");

                GameState.players.delete(player.id);

                // GameState.bullets
                //     .filter(bullet => bullet.owner === player.id)
                //     .forEach(bullet => {
                //         GameState.bullets.delete(bullet.id);
                //     });

                Pool.release(player);

                player.clear();

                console.log(`\n${GameState.players.size} player online!`);

            });

        });

    }

}