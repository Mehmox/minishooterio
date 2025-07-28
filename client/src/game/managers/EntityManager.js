import Player from "../entities/Player.js";
import Bullet from "../entities/Bullet.js";

export default class EntityPool {

    constructor(playerInstanse, settings) {

        this.pool = {
            player: [],
            bullet: [],
        }

        this.entities = 0;

        while (this.entities < playerInstanse + 4) {

            this.pool.player.push(new Player(this.entities, settings.player.size));

            this.entities++;

        }

        while (this.entities < Math.ceil((playerInstanse + 4) * settings.player.fireRate * settings.bullet.lifespan * 1.1) + this.pool.player.length) {

            this.pool.bullet.push(new Bullet(this.entities, settings.bullet.size));

            this.entities++;

        }

        console.log(`${this.entities} entities created!`);

    }

}