export default function fire(GameState, EntityManager, players, gameTick, Tick) {

    players.forEach(player => {

        if (player.isShooting && gameTick >= player.cooldown) {

            player.cooldown = gameTick + Math.floor(Tick / player.fireRate);

            const bullet = EntityManager.acquire("Bullet", { player, gameTick });

            GameState.bullets.set(bullet.id, bullet);

        }

    });

}
