//Bullet.js

const crypto = require("crypto");

module.exports = class Bullet {

    constructor(player, target) {
        this.id = crypto.randomUUID();
        this.owner = player.self;
        this.stats = {
            size: 25,
            damage: 1,
            speed: 1,
        }
        this.distance = player.pov.width * 1.5;
        this.traveled = 0;
        this.position = { ...player.position };
        this.plus = this.normalize(target);
        this.end = {
            x: this.position.x + this.plus.x,
            y: this.position.y + this.plus.y
        }

        this.playerSize = player.stats.size;
        this.history = [];

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

}