const Game_settings = require("../../../Game_settings.json");

const Player = require("../entities/Player");
const Bullet = require("../entities/Bullet");

const fireRate = Game_settings.new.player.fireRate;
const lifespan = Game_settings.new.bullet.lifespan;

module.exports = class EntityPool {

    constructor(playerInstanse, ENV, Tick) {

        this.pool = {
            player: [],
            bullet: [],
        }

        this.entities = 0;

        while (this.entities < playerInstanse + 4) {

            this.pool.player.push(new Player(Game_settings, this.entities, Tick));

            this.entities++;

        }

        while (this.entities < Math.ceil((playerInstanse + 4) * fireRate * lifespan * 1.1) + this.pool.player.length) {

            this.pool.bullet.push(new Bullet(Game_settings, this.entities, Tick));

            this.entities++;

        }

        console.log(`${this.entities} entities created!`);

    }

    acquirePlayer() {
        const player = this.pool.player.find(e => !e.isActive) || null
        player.isActive = true;
        return player;
    }
    acquireBullet() {
        const bullet = this.pool.bullet.find(e => !e.isActive) || null;
        bullet.isActive = true;
        return bullet;
    }

    release(entity) {
        entity.isActive = false;
        entity.clear();
    }

    getActivePlayer() {
        return this.pool.player.filter(e => e.isActive);
    }

    getActiveBullet() {
        return this.pool.bullet.filter(e => e.isActive);
    }

}
