//collision.js

module.exports = function is_collision(Object1, Object2) {

    if (Object1.self !== Object2.owner) {

        const dist = Math.hypot(Object2.position.x - Object1.position.x, Object2.position.y - Object1.position.y);

        if (dist <= Object1.stats.size + Object2.stats.size) {

            return true;

        }

    }

    return false;

}