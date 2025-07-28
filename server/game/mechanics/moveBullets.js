const markDirty = require("../utils/markDirty");

module.exports = function Move(bullets, now, players) {

    bullets.forEach(bullet => {

        if (now - bullet.birth >= bullet.lifespan) {

            bullets.delete(bullet.id);
            players.get(bullet.owner).bulletInfo.delete(bullet.id);
            bullet.clear();

        } else {

            bullet.x += bullet.plusX;
            bullet.y += bullet.plusY;

        }

    });

} 