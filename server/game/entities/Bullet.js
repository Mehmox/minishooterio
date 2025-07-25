module.exports = class Bullet {

    setOwner(owner, x, y, targetX, targetY) {

        this.owner = owner;
        this.isActive = true;
        this.birth = performance.now();
        this.x = x;
        this.y = y;
        const { X, Y } = this.normalize(targetX, targetY);
        this.plusX = X;
        this.plusY = Y;
        this.collision_history.clear();

    }

    clear() {

    }

    normalize(targetX, targetY) {

        let directionX = targetX - this.x;
        let directionY = targetY - this.y;

        let magnitude = Math.sqrt(directionX * directionX + directionY * directionY);

        return {
            X: directionX / magnitude * this.speed,
            Y: directionY / magnitude * this.speed,
        }

    }

    constructor(Game_settings, i, Tick) {

        //constants
        this.id = i;
        this.lifespan = Game_settings.new.bullet.lifespan * 1000;
        this.damage = Game_settings.new.bullet.damage;
        this.size = Game_settings.new.bullet.size;
        this.speed = Game_settings.new.bullet.speed / Tick * 60;

        //varibles
        this.isActive = false;
        this.owner = undefined;

        //changing continuously
        this.x = -5000;
        this.y = -5000;
        this.birth = 0;
        this.plusX = undefined;
        this.plusY = undefined;
        this.collision_history = new Set();
        
    }

}