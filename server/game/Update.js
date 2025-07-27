const eff = require("../../tools/Efficiency");

const updateBullets = require("./update/updateBullets");
const updatePlayers = require("./update/updatePlayers");
const is_collision = require("../core/checkCollisions");
const SetBullets = require("../core/setBullets");
const SetEnemys = require("../core/setEnemys");
const send = require("../net/send");
// const { leech, leechAsync } = require("../../tools/leech");

const Efficiency = new eff();

module.exports = function GameLoop(Tick, snapshotTick, io, Game) {

    const ms = 1000 / Tick;
    let GameTick = 0;
    let Last_Update_Time = performance.now();
    const snapshot = Tick / snapshotTick;

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
            if (GameTick % snapshot === 0) send(io, Game);

            Last_Update_Time = now;

            // Efficiency.now();

        }

        setImmediate(() => Update());

    }

    Update();

}