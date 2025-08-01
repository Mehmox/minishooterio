const Bullet = require("./Bullet");

const DIAGONAL_FACTOR = Math.sqrt(2);

module.exports = class Player {

    constructor(socketid, FPS, ENV, Game_settings, nick) {

        this.id = socketid;
        this.FPS = FPS;
        this.ENV = ENV;
        this.nick = nick;

        this.stats = { ...Game_settings.player.stats };

        this.baseStats = { ...this.stats };

        this.combat = Game_settings.player.combat;

        this.KDA = { kill: 0, dead: 0, assist: 0, }

        this.mapWidth = Game_settings.width;
        this.mapHeight = Game_settings.height;

        this.setPosition();
        this.movementUnit = this.stats.speed / DIAGONAL_FACTOR;
        this.direction = "";

        this.pov = Game_settings.player.pov;

        this.enemyInfo = {};
        this.bulletInfo = {};

    }
    setPosition() {

        switch (this.ENV) {

            case "production":
                this.position = {
                    x: Math.random() * (this.mapWidth) + this.stats.size * 2,
                    y: Math.random() * (this.mapHeight) + this.stats.size * 2,
                }; break;
            case "test":
            default: this.position = { x: 100, y: 2000 }; break;

        }

    }

    fire(bullets) {

        const now = performance.now()

        if (now >= this.combat.cooldown) {

            this.combat.cooldown = now + 1000 / this.combat.fireRate;

            const bullet = new Bullet(this);

            bullets[bullet.id] = bullet;

        }

    }

    hit(damage, owner) {

        this.stats.health -= damage;

        if (this.stats.health <= 0) {

            owner.KDA.kill++;
            this.KDA.dead++;

            this.setPosition();

            this.stats.health = this.baseStats.health;

        };

    }

    Up() {

        if (this.position.y - this.stats.speed > 0)
            this.position.y -= this.stats.speed;

    }
    Right() {

        if (this.position.x + this.stats.speed < this.mapWidth)
            this.position.x += this.stats.speed;

    }
    Down() {

        if (this.position.y + this.stats.speed < this.mapHeight)
            this.position.y += this.stats.speed;

    }
    Left() {

        if (this.position.x - this.stats.speed > 0)
            this.position.x -= this.stats.speed;

    }

    UpRight() {

        if (this.position.y - this.movementUnit > 0)
            this.position.y -= this.movementUnit;

        if (this.position.x + this.movementUnit < this.mapWidth)
            this.position.x += this.movementUnit;

    }
    UpLeft() {

        if (this.position.y - this.movementUnit > 0)
            this.position.y -= this.movementUnit;

        if (this.position.x - this.movementUnit > 0)
            this.position.x -= this.movementUnit;

    }

    DownRight() {

        if (this.position.x + this.movementUnit < this.mapWidth)
            this.position.x += this.movementUnit;

        if (this.position.y + this.movementUnit < this.mapHeight)
            this.position.y += this.movementUnit;

    }
    LeftDown() {

        if (this.position.y + this.movementUnit < this.mapHeight)
            this.position.y += this.movementUnit;

        if (this.position.x - this.movementUnit > 0)
            this.position.x -= this.movementUnit;

    }

    serialize() {

        return {
            x: this.position.x.toFixed(3),
            y: this.position.y.toFixed(3),
            health: this.stats.health / this.baseStats.health * 100,
            nick: this.nick,
            enemyInfo: this.enemyInfo,
            bulletInfo: this.bulletInfo,
            KDA: this.KDA,
        }

    }

}