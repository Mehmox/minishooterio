module.exports = function updateBullets(bullets) {

    Object.values(bullets).forEach(bullet => {

        const traveledPath = {
            x: bullet.stats.speed * bullet.plus.x,
            y: bullet.stats.speed * bullet.plus.y,
        }

        bullet.position.x += traveledPath.x;
        bullet.position.y += traveledPath.y;

        bullet.traveled += bullet.stats.speed

    });

}