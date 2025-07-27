//Players.js

const crypto = require("crypto");

const Bullet = require("./Bullet");

const DIAGONAL_FACTOR = Math.sqrt(2);

module.exports = class Player {

    constructor(FPS, ENV, Game_settings, userName) {

        this.self = crypto.randomBytes(8).toString("base64");
        this.FPS = FPS;
        this.ENV = ENV;
        this.userName = userName;

        this.stats = { ...Game_settings.player.stats };
        this.stats.speed *= (128 / FPS);

        this.baseStats = { ...this.stats };
        this.baseStats.speed *= (128 / FPS);

        this.combat = Game_settings.player.combat;

        this.KDA = { kill: 0, dead: 0, assist: 0, }

        this.mapWidth = Game_settings.width;
        this.mapHeight = Game_settings.height;

        this.setPosition();
        this.movementUnit = this.stats.speed / DIAGONAL_FACTOR;
        this.direction = "";

        this.pov = Game_settings.player.pov;

        this.enemieInfo = {};
        this.bulletInfo = {};

    }

    hit(damage, owner) {

        this.stats.healt -= damage;

        if (this.stats.healt <= 0) {

            owner.KDA.kill++;
            this.KDA.dead++;

            this.setPosition();

            this.stats.healt = this.baseStats.healt;

        };

    }

    fire(bullets) {

        const now = performance.now()

        if (now >= this.combat.cooldown) {

            this.combat.cooldown = now + 1000 / this.combat.fireRate;

            const bullet = new Bullet(this);

            bullets[bullet.id] = bullet;

        }

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

    RightDown() {

        if (this.position.x + this.movementUnit < this.mapWidth)
            this.position.x += this.movementUnit;

        if (this.position.y + this.movementUnit < this.mapHeight)
            this.position.y += this.movementUnit;

    }
    DownLeft() {

        if (this.position.y + this.movementUnit < this.mapHeight)
            this.position.y += this.movementUnit;

        if (this.position.x - this.movementUnit > 0)
            this.position.x -= this.movementUnit;

    }

    setPosition() {

        switch (this.ENV) {

            case "production":
            case "test":
                this.position = {
                    x: Math.random() * (this.mapWidth) + this.stats.size * 2,
                    y: Math.random() * (this.mapHeight) + this.stats.size * 2,
                }; break;

            default: this.position = { x: 200, y: 200, }; break;

        }

    }

    userName(nick) {

        this.KDA.userName = nick;

    }

}