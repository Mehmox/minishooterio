import AOI from "../utils/AOI.js";
import markDirty from "../utils/markDirty.js";
import fullSnapshot from "./fullSnapshot.js";

function updateVisibilityStatus(player, entity, type) {

    if (AOI(player, entity)) {

        if (!player[type].has(entity.id)) {

            player[type].add(entity.id);

            if (type === "seenEnemys") {

                fullSnapshot(entity, markDirty);

            }

            entity.seenBy.add(player.id);

            markDirty(player, "inSight", entity.id);

        }

    } else {

        if (player[type].has(entity.id)) {

            player[type].delete(entity.id);

            entity.seenBy.delete(player.id);

            markDirty(player, "outSight", entity.id);

        }

    };

}





export default function updateAOI(players, bullets) {

    players.forEach(player => {

        players.forEach(enemie => {
            if (player.id === enemie.id) return;

            updateVisibilityStatus(player, enemie, "seenEnemys");

        });

        bullets.forEach(bullet => {

            updateVisibilityStatus(player, bullet, "seenBullets");

        });

    });

} 