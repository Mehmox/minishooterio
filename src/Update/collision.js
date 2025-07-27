//collision.js

module.exports = function is_collision(Player, Bullet) {

    if (Player.id !== Bullet.owner) {

        const distance = Math.hypot(Bullet.position.x - Player.position.x, Bullet.position.y - Player.position.y);

        if (distance <= Player.stats.size + Bullet.stats.size) {

            return true;

        }

    }

    return false;

}