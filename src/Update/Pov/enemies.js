//enemie.js

const is_In_Pov = require("../inPov");

module.exports = function SetEnemies(self, players) {

    self.enemieInfo = {};

    for (const playerId in players) {

        const enemie = players[playerId];

        if (self.id !== playerId && is_In_Pov(self, enemie)) {

            self.enemieInfo[playerId] = {
                position: enemie.position,
                size: enemie.stats.size
            }

        }

    }
}