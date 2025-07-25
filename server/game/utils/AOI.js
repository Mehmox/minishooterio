const viewX = 1920 / 2;
const viewY = 925 / 2;

module.exports = function AOI(player, entity) {

    if (entity.x - entity.size <= player.x + viewX &&
        entity.x + entity.size >= player.x - viewX) {

        if (entity.y - entity.size <= player.y + viewY &&
            entity.y + entity.size >= player.y - viewY) {

            return true;

        }

    }

    return false;

}