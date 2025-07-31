const respawn = require("../mechanics/respawn");
const collision = require("./collisions");

module.exports = function Damage(bullets, players) {

    bullets.forEach(bullet => {

        players.forEach(player => {

            if (collision(player, bullet) && !bullet.collision_history.has(player.id)) {

                bullet.collision_history.add(player.id);

                player.health -= bullet.damage;

                if (player.health <= 0) {

                    players.get(bullet.owner).KDA.kill++;
                    player.KDA.dead++;

                    respawn(player);

                    player.dead();

                };

            }
        });

    });

}