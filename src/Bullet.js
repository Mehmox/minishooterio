//Bullet.js
module.exports = class Bullet {
    constructor(player, target) {
        this.owner = player.self;
        this.size = 1;
        this.speed = 20;
        this.distance = 100;
        this.start = {
            x: player.pov.width/2,
            y: player.pov.height/2
        }
        this.position = {
            x: player.pov.width/2,
            y: player.pov.height/2
        }
        this.target = this.normalize(target);


        this.playerSize = player.size;
    }

    normalize(target) {
        let directionX = target.x - this.start.x;
        let directionY = target.y - this.start.y;

        let magnitude = Math.sqrt(directionX * directionX + directionY * directionY);

        let unitX = directionX / magnitude;
        let unitY = directionY / magnitude;

        return {
            x: unitX * this.distance,
            y: unitY * this.distance,
        }
    }
}