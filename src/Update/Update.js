//Update.js

const eff = require("../class/Efficiency");

const updateBullets = require("./positions/updateBullets");
const updatePlayers = require("./positions/updatePlayers");
const is_collision = require("./collision");
const SetBullets = require("./Pov/setBullets");
const SetEnemys = require("./Pov/setEnemys");
const send = require("./Send/send");
// const { leech, leechAsync } = require("../leech");

const Efficiency = new eff({ log_Mode: "linear" });

module.exports = function GameLoop(Tick, io, Game) {

    const ms = 1000 / Tick;
    let GameTick = 0;
    let Last_Update_Time = performance.now();

    function Update() {

        const now = performance.now();

        if (now - Last_Update_Time >= ms) {

            // Efficiency.now();

            GameTick++;

            const bullets = Game.bullets;
            const players = Game.players;

            //bullet position update
            updateBullets(bullets);
            //player position update
            updatePlayers(players, bullets);
            //player collision update
            Object.values(bullets).forEach(bullet => {

                Object.values(Game.players).forEach(player => {

                    if (is_collision(player, bullet) && !bullet.history.has(player.id)) {

                        bullet.history.add(player.id);

                        player.hit(bullet.stats.damage, Game.players[bullet.owner]);

                    }

                });

            });
            //player pov object update (enemys/bullets)
            Object.values(players).forEach(player => {

                SetBullets(player, bullets);

                SetEnemys(player, players);

            });
            //update leaderBoard
            Game.leaderboard = Object.values(Game.KDA).sort((a, b) => (b.KDA.kill + b.KDA.assist / 2) - (a.KDA.kill + a.KDA.assist / 2));
            //updated game data send to all clients
            send(io, Game);

            Last_Update_Time = now;

            // Efficiency.now();

        }

        setImmediate(() => Update());

    }

    Update();

}