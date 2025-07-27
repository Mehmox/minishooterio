module.exports = function is_In_Pov(player, object) {

    if (object.position.x - object.stats.size <= player.position.x + player.pov.width / 2 &&
        player.position.x - player.pov.width / 2 <= object.position.x + object.stats.size) {

        if (object.position.y - object.stats.size <= player.position.y + player.pov.height / 2 &&
            player.position.y - player.pov.height / 2 <= object.position.y + object.stats.size) {
            return true;
        }

    }

    return false;

}