//enemie.js

const is_In_Pov = require("./inPov");

module.exports = function SetEnemies(self, players, selfid) {
    
    self.enemieInfo = {};

    for (const playerId in players) {

        const enemie = players[playerId];

        if (selfid !== playerId && is_In_Pov(self, enemie)) {

            self.enemieInfo[playerId] = {
                position: {
                    x: enemie.position.x,
                    y: enemie.position.y,
                },
                size: enemie.stats.size
            }

        } else delete self.enemieInfo[playerId];

    }
}