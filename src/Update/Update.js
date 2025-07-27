//Update.js
let counter = 0;
const SetEnemies = require("./enemies");
const SetBullets = require("./bullets");
const is_collision = require("./collision");
const leechAsync = require("../leechAsync")

module.exports = function Update(io, Game) {
    counter++;
    // console.time("UpdateTick");

    // performance.mark("update Start");

    const bullets = Game.bullets;

    for (const selfid in Game.players) {

        const self = Game.players[selfid];

        const directions = {
            up: 'Up',
            down: 'Down',
            right: 'Right',
            left: 'Left',
            upright: 'UpRight',
            upleft: 'UpLeft',
            rightdown: 'RightDown',
            downleft: 'DownLeft'
        };
        if (directions[self.direction]) self[directions[self.direction]]();

        SetBullets(self, bullets);

        SetEnemies(self, Game.players, selfid);

    }

    for (const bulletId in bullets) {

        const bullet = bullets[bulletId];

        for (const playerId in Game.players) {

            const player = Game.players[playerId];

            if (!bullet.history.includes(playerId) && is_collision(player, bullet)) {

                // bullet.history.push(playerId);

                player.hit(bullet.stats.damage, Game.players[bullet.owner]);

            }

        }

    }

    Game.leaderboard.sort((a, b) => (b.KDA.kill + b.KDA.assist / 2) - (a.KDA.kill + a.KDA.assist / 2));

    io.emit("update", Game);

    // performance.mark("update End");
    // performance.measure("result", "update Start", "update End");

    // var leech = 0;
    // for (let j = 0; j < 100000000; j++) {
    //     leech++;
    // } 

    // console.timeEnd("UpdateTick");

}
// setInterval(() => {
//     console.log(performance.getEntries())
//     performance.clearMarks();
//     performance.clearMeasures();
// }, 1000);

setInterval(() => console.log(counter, counter % 60), 1000);