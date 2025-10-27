export default class Bullet {

    setOwner({ player, gameTick }) {

        this.isActive = true;

        const { id, x, y, Muzzle_SERVER_X, Muzzle_SERVER_Y } = player;

        this.owner = id;
        this.tick_of_death = gameTick + this.lifespan;
        this.x = x;
        this.y = y;
        const { X, Y } = this.normalize(Muzzle_SERVER_X, Muzzle_SERVER_Y);
        this.plusX = X;
        this.plusY = Y;

    }

    clear() {
        
        this.isActive = false;
        this.collision_history.clear();
        this.seenBy.clear();
        
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

    constructor(game_settings, i, Tick) {

        this.type = "Bullet";

        //constants
        this.id = i;
        this.lifespan = game_settings.bullet.lifespan * Tick;
        this.damage = game_settings.bullet.damage;
        this.size = game_settings.bullet.size;
        this.speed = game_settings.bullet.speed / Tick * 60;

        //varibles
        this.isActive = false;
        this.owner = undefined;

        //changing continuously
        this.x = -5000;
        this.y = -5000;
        this.tick_of_death = 0;
        this.plusX = undefined;
        this.plusY = undefined;
        this.collision_history = new Set();
        this.seenBy = new Set();

    }

}