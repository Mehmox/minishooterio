import respawn from "./respawn.js";
import collision from "./collisions.js";
import markDirty from "../utils/markDirty.js";

export default function Damage(bullets, players) {

    bullets.forEach(bullet => {

        players.forEach(player => {

            if (collision(player, bullet) && !bullet.collision_history.has(player.id)) {

                bullet.collision_history.add(player.id);

                player.healthNum -= bullet.damage;
                player.health = player.healthNum / player.maxhealth * 100;

                if (player.health <= 0) {

                    players.get(bullet.owner).KDA.kill++;
                    player.KDA.dead++;

                    respawn(player);

                    player.dead();

                    // console.log(players.get(bullet.owner).KDA)

                };

                markDirty(player, "health");

            }

        });

    });

}