//src/Update/Pov/enemy.js
const is_In_Pov = require("./inPov");

module.exports = function SetEnemys(player, players) {

    player.enemyInfo = {};

    Object.values(players).forEach(enemy => {

        if (player.id !== enemy.id && is_In_Pov(player, enemy)) {

            player.enemyInfo[enemy.id] = {
                x: enemy.position.x,
                y: enemy.position.y,
                health: enemy.stats.health / enemy.baseStats.health * 100,
                nick: enemy.nick
            }

        }

    });

}