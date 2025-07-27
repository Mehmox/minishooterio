const crypto = require("crypto");

module.exports = class Bullet {

    constructor(player) {

        this.id = crypto.randomBytes(8).toString("base64");
        this.owner = player.id;
        this.stats = {
            size: 7,
            damage: 1,
            speed: 8,
        }
        this.distance = 1000;
        this.traveled = 0;
        this.position = { ...player.position };
        this.plus = this.normalize(player.combat.AMMO_SERVER_POS);
        this.end = {
            x: this.position.x + this.plus.x,
            y: this.position.y + this.plus.y
        }
        this.playerSize = player.stats.size;
        this.history = new Set();

        this.birth = performance.now();

    }

    normalize(target) {

        let directionX = target.x - this.position.x;
        let directionY = target.y - this.position.y;

        let magnitude = Math.sqrt(directionX * directionX + directionY * directionY);

        return {
            x: directionX / magnitude,
            y: directionY / magnitude,
        }

    }

    serialize(isowner) {

        return {
            x: this.position.x.toFixed(3),
            y: this.position.y.toFixed(3),
            isowner,
        }

    }

}