//bullets.js

const is_In_Pov = require("./inPov");

module.exports = function SetBullets(self, bullets) {

    self.bulletInfo = {};

    for (const bulletId in bullets) {

        const bullet = bullets[bulletId];

        const traveledPath = {
            x: bullet.stats.speed * bullet.plus.x,
            y: bullet.stats.speed * bullet.plus.y,
        }

        bullet.position.x += traveledPath.x;
        bullet.position.y += traveledPath.y;

        bullet.traveled += (Math.abs(traveledPath.x) + Math.abs(traveledPath.y));

        if (is_In_Pov(self, bullet)) {

            self.bulletInfo[bulletId] = {
                id: bulletId,
                owner: bullet.owner,
                position: bullet.position,
                size: bullet.stats.size
            }

        } else delete self.bulletInfo[bulletId];

        if (bullet.traveled >= bullet.distance) delete bullets[bulletId];

    }

}