const is_In_Pov = require("./inPov");

module.exports = function SetBullets(player, bullets) {

    player.bulletInfo = {};

    Object.values(bullets).forEach(bullet => {

        if (bullet.traveled >= bullet.distance) {
            delete bullets[bullet.id];
            return;
        } else if (is_In_Pov(player, bullet)) {

            player.bulletInfo[bullet.id] = {
                x: bullet.position.x,
                y: bullet.position.y,
                isowner: Number(player.id === bullet.owner)
            }

        }

    });

}