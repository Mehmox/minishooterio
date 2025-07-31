const markDirty = require("../utils/markDirty");

module.exports = function Move(bullets, now) {

    bullets.forEach(bullet => {

        if (now - bullet.birth >= bullet.lifespan) {

            bullets.delete(bullet.id);
            bullet.clear();

        } else {

            bullet.x += bullet.plusX;
            bullet.y += bullet.plusY;
            
            markDirty(bullet.id, "x", bullet.x);
            markDirty(bullet.id, "y", bullet.y);

        }

    });

} 