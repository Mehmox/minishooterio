module.exports = function updateBullets(bullets) {

    for (const bulletId in bullets) {

        const bullet = bullets[bulletId];

        const traveledPath = {
            x: bullet.stats.speed * bullet.plus.x,
            y: bullet.stats.speed * bullet.plus.y,
        }

        bullet.position.x += traveledPath.x;
        bullet.position.y += traveledPath.y;

        bullet.traveled += (Math.abs(traveledPath.x) + Math.abs(traveledPath.y));

    }

}