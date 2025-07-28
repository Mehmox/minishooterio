module.exports = function Collisions(player, bullet) {

    if (player.id !== bullet.owner) {

        const area = Math.hypot(
            bullet.x - player.x,
            bullet.y - player.y);

        if (area <= player.size + bullet.size) return true;

    }

    return false;

}