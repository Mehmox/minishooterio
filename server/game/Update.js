const Efficiency = require("../../tools/Efficiency");
// const { leech, leechAsync } = require("../../tools/leech");

const updateBullets = require("./update/updateBullets");
const updatePlayers = require("./update/updatePlayers");
const is_collision = require("./mechanics/collisions");
const SetBullets = require("./mechanics/setBullets");
const SetEnemys = require("./mechanics/setEnemys");
const send = require("../net/send");
module.exports = function GameLoop(Tick, snapshotTick, io, Game) {

    const ms = 1000 / Tick;
    const delay = ms * 0.2;
    let GameTick = 0;
    let Last_Update_Time = performance.now();
    const snapshot = Tick / snapshotTick;

    function Update() {

        const now = performance.now();
        const delta = now - Last_Update_Time;

        if (delta >= ms) {

            // Efficiency.check();

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

            // Efficiency.check();

            setTimeout(Update, Object.keys(Game.players).length ? delay : 1000);


        } else setImmediate(Update);

    }

    Update();

}