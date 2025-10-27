import fs from "fs";
const game_settings = JSON.parse(fs.readFileSync("game_settings.json", "utf8"));
import Log from "../../../../shared/Log.js";
import Player from "../entities/Player.js";
import Bullet from "../entities/Bullet.js";

const fireRate = game_settings.player.fireRate;
const lifespan = game_settings.bullet.lifespan;

class EntityManager {

    set(playerInstanse, Tick) {

        this.pool = [];

        const playerOffGap = 4;
        const bulletOffGap = 1.1;

        this.targetPlayerInstance = playerInstanse + playerOffGap;
        this.targetBulletInstance = Math.ceil(this.targetPlayerInstance * fireRate * lifespan * bulletOffGap) + this.targetPlayerInstance;

        while (this.pool.length < this.targetPlayerInstance) {

            this.pool.push(new Player(game_settings, this.pool.length, Tick));

        }

        while (this.pool.length < this.targetBulletInstance) {

            this.pool.push(new Bullet(game_settings, this.pool.length, Tick));

        }

        Log(`${this.pool.length} entities created!`, "Server");

        const playerNum = this.pool.filter(instance => instance.type === "Player").length;
        Log(`\t${playerNum} player entities!`, "Server");

        const bulletNum = this.pool.filter(instance => instance.type === "Bullet").length;
        Log(`\t${bulletNum} player entities!`, "Server");

    }

    acquire(type, props) {
        let Index;

        if (type === "Player") {

            Index = this.pool.slice(0, this.targetPlayerInstance - 1).findIndex(e => !e.isActive);

        } else {

            const i = this.pool.slice(this.targetPlayerInstance).findIndex(e => !e.isActive);

            Index = i === -1 ? -1 : i + this.targetPlayerInstance;

        }

        const entity = this.pool[Index] || null;

        if (entity == null) throw new Error("Pool limiti aşıldı");

        entity.setOwner(props);

        return entity;

    }

    release(entity) {
        entity.clear();
    }

}

const manager = new EntityManager();

export default manager;