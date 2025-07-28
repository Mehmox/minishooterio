const AOI = require("./AOI");
const markDirty = require("./markDirty");

function CantFindName(player, entity, type) {

    if (AOI(player, entity)) {

        if (!player[type].has(entity.id)) {

            player[type].add(entity.id);

            markDirty(player.id, "inVision", entity.id, "add");

        }

    } else {

        if (player[type].has(entity.id)) {

            player[type].delete(entity.id);

            markDirty(player.id, "inVision", entity.id, "delete");

        }

    };

}

module.exports = function updateAOI(players, bullets) {

    players.forEach(player => {

        bullets.forEach(bullet => {

            CantFindName(player, bullet, "bulletInfo");

        });

        players.forEach(enemie => {
            if (player.id === enemie.id) return;

            CantFindName(player, enemie, "enemyInfo");

        });

    });

} 