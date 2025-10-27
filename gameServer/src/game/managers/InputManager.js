//gameServer/game/core/Game.js
import fs from "fs";
const game_settings = JSON.parse(fs.readFileSync("./game_settings.json", "utf8"));
import respawn from "../mechanics/respawn.js";
import markDirty from "../utils/markDirty.js";
import Logger from "../utils/Logger.js";
import Log from "../../../../shared/Log.js";

export default class InputManager {

    constructor(io, EntityManager, GameState, snapshotRate, maxPlayer) {

        io.on("connect", (socket) => {

            let { nick } = socket.handshake.query;

            if (nick === "undefined") nick = "";

            const player = EntityManager.acquire("Player", { nick, socket_id: socket.id });

            respawn(player);

            markDirty(player, "nick");
            markDirty(player, "health");
            markDirty(player, "x");
            markDirty(player, "y");

            GameState.players.set(player.id, player);

            Logger(player, "joined");
            Log(`${GameState.players.size} player online!`);

            socket.emit("login", { delta: 1000 / snapshotRate, id: player.id, settings: game_settings, nick: player.nick });

            socket.on("ping", (fn) => { fn({ playerCount: io.sockets.sockets.size, playerLimit: maxPlayer }); });

            socket.on("combat", ({ isShooting, Muzzle_Direction, direction }) => {

                player.isShooting = isShooting;

                player.Muzzle_SERVER_X = player.x - 1920 / 2 + Muzzle_Direction.x;
                player.Muzzle_SERVER_Y = player.y - 925 / 2 + Muzzle_Direction.y;
                player.direction = direction;

                const directionX = player.Muzzle_SERVER_X - player.x;
                const directionY = player.Muzzle_SERVER_Y - player.y;

                const newAngle = Math.atan2(directionY, directionX);

                if (player.angle !== newAngle) {
                    player.angle = newAngle
                    markDirty(player, "angle", newAngle);
                }

            });

        });

    }

}