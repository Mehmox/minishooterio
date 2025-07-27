//bullets.js

const is_In_Pov = require("../inPov");

module.exports = function SetBullets(self, bullets) {

    self.bulletInfo = {};

    for (const bulletId in bullets) {

        const bullet = bullets[bulletId];

        if (is_In_Pov(self, bullet)) {

            self.bulletInfo[bulletId] = {
                position: bullet.position,
                size: bullet.stats.size,
                id: bulletId,
                owner: bullet.owner,
            }

        }

        if (bullet.traveled >= bullet.distance) delete bullets[bulletId];

    }

}