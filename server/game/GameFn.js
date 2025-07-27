const Player = require("./entities/Player");
const Game_settings = require("../../Game_settings.json");

const GameLoop = require("./Update");

const FPS = 128;
const snapshotRate = FPS / 5;
const Game = {
    players: {},
    bullets: {},
    KDA: [],
    leaderboard: [],
}

module.exports = function Gamefn(io, ENV) {

    io.on("connect", (socket) => {

        let { nick } = socket.handshake.query;

        if (nick === "undefined") nick = "";

        const user = new Player(socket.id, FPS, ENV, Game_settings, nick);

        Game.players[user.id] = user;

        Game.KDA[user.id] = { KDA: Game.players[user.id].KDA, nick: Game.players[user.id].nick };

        console.log(`"${user.nick}"[#${user.id}] joined.`);
        console.log(`\n${Object.keys(Game.players).length} player online!`);

        socket.emit("login", { delta: 1000 / snapshotRate, id: socket.id, settings: Game_settings, nick: user.nick });

        socket.on("ping", (res) => {

            if (typeof (res) === "function") res();

        });

        socket.on("combat", ({ isShooting, Muzzle_Direction, direction }) => {

            user.combat = {
                ...user.combat,
                isShooting,
                AMMO_CLIENT_POS: Muzzle_Direction
            }

            Game.players[user.id].direction = direction;

        });

        socket.on("disconnect", () => {

            delete Game.players[user.id];
            delete Game.KDA[user.id];

            Object.values(Game.bullets).forEach(bullet => {

                if (bullet.owner === user.id) delete Game.bullets[bullet.id];

            });

            console.log(`"${user.nick}"[#${user.id}] disconnected.`);
            console.log(`\n${Object.keys(Game.players).length} player online!`);

        });

    });

    GameLoop(FPS, snapshotRate, io, Game);

}