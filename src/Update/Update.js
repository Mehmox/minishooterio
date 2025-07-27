//Update.js

const eff = require("../class/Efficiency");

const updateBullets = require("./positions/updateBullets");
const updatePlayers = require("./positions/updatePlayers");
const SetEnemies = require("./Pov/enemies");
const SetBullets = require("./Pov/bullets");
const is_collision = require("./collision");
// const { leech, leechAsync } = require("../leechAsync");

const Efficiency = new eff({ log_Mode: "linear" });

module.exports = function GameLoop(Tick, io, Game) {

    const ms = 1000 / Tick;
    let GameTick = 0;
    let Last_Update_Time = performance.now();

    function Update() {

        const now = performance.now();

        if (now - Last_Update_Time >= ms) {

            Efficiency.now();

            GameTick++;

            const bullets = Game.bullets;
            const players = Game.players;

            //bullet position update
            updateBullets(bullets);
            //player position update
            updatePlayers(players, bullets);
            //player pov object update (enemies/bullets)
            for (const selfid in players) {

                const self = players[selfid];

                SetBullets(self, bullets);

                SetEnemies(self, players);

            }
            //player collision update
            for (const bulletId in bullets) {

                const bullet = bullets[bulletId];

                for (const playerId in Game.players) {

                    const player = Game.players[playerId];

                    if (!bullet.history.has(playerId) && is_collision(player, bullet)) {

                        bullet.history.add(playerId);

                        player.hit(bullet.stats.damage, Game.players[bullet.owner]);

                    }

                }

            }
            //update leaderBoard
            Game.leaderboard.sort((a, b) => (b.KDA.kill + b.KDA.assist / 2) - (a.KDA.kill + a.KDA.assist / 2));
            //send updated game data to all clients

            if (GameTick % Tick === 0) {

                io.emit("update", Game);

            } else {

                io.emit("update", {
                    players: Game.players,
                    bullets: Game.bullets
                });

            }

            Last_Update_Time = now;

            Efficiency.now();

        }

        setImmediate(() => Update());

    }

    Update();

}