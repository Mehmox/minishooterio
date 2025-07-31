const AOI = require("../utils/AOI");
const markDirty = require("../utils/markDirty");
const fullSnapshot = require("./fullSnapshot");

function CantFindName(player, entity, type) {

    if (AOI(player, entity)) {

        if (!player[type].has(entity.id)) {

            player[type].add(entity.id);

            if (type === "seenEnemys") {
                
                fullSnapshot(entity, markDirty);
                
                entity.seenBy.add(player.id);

            }

            markDirty(player.id, "inVision", entity.id, "add");

        }

    } else {

        if (player[type].has(entity.id)) {

            player[type].delete(entity.id);

            if (type === "seenEnemys") entity.seenBy.delete(player.id);

            markDirty(player.id, "inVision", entity.id, "delete");

        }

    };

}

module.exports = function updateAOI(players, bullets) {

    players.forEach(player => {

        players.forEach(enemie => {
            if (player.id === enemie.id) return;

            CantFindName(player, enemie, "seenEnemys");

        });

        bullets.forEach(bullet => {

            CantFindName(player, bullet, "seenBullets");

        });

    });

} 