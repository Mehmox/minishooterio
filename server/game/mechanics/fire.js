module.exports = function fire(GameState, Pool, players, now) {

    players.forEach(player => {

        if (player.isShooting && now >= player.cooldown) {

            player.cooldown = now + 1000 / player.fireRate;

            const bullet = Pool.acquireBullet();

            bullet.setOwner(player.id, player.x, player.y, player.Muzzle_SERVER_X, player.Muzzle_SERVER_Y);

            GameState.bullets.set(bullet.id, bullet);

        }

    });

}
