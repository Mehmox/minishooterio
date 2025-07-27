//Players.js

const Bullet = require("./Bullet");

const DIAGONAL_FACTOR = Math.sqrt(2);

module.exports = class Player {

    constructor(self, ENV, Game_settings, test) {
        this.ENV = ENV;
        this.self = self;
        this.userName = test;
        this.stats = {
            healt: 1,
            size: 20,
            speed: 5,
        }
        this.baseStats = this.stats;
        this.KDA = {
            kill: 0,
            dead: 0,
            assist: 0,
        }
        switch (ENV) {
            case "pro":
                this.position = {
                    x: Math.random() * (Game_settings.width - this.stats.size) + this.stats.size,
                    y: Math.random() * (Game_settings.height - this.stats.size) + this.stats.size,
                }
                break;
            case "dev":
            case "test":
                this.position = {
                    x: 400,
                    y: 400,
                }
                break;
        }

        this.pov = {
            width: Game_settings.pov.width,
            height: Game_settings.pov.height
        }
        this.direction = "";

        this.mapWidth = Game_settings.width;
        this.mapHeight = Game_settings.height;


        this.fireRate = 4;
        this.cooldown = 0;

        this.enemieInfo = {};
        this.bulletInfo = {};

    }

    fire(bullets, target) {

        if (Date.now() >= this.cooldown) {

            this.cooldown = Date.now() + 1000 / this.fireRate;

            const bullet = new Bullet(this, target);
            bullets[bullet.id] = bullet;

        }

    }

    hit(damage, owner) {

        this.stats.healt -= damage;

        if (this.stats.healt <= 0) this.dead(owner);

    }

    dead(owner) {

        owner.KDA.kill++;
        this.KDA.dead++;

        switch (this.ENV) {
            case "pro":
                this.position = {
                    x: Math.random() * (this.mapWidth - this.stats.size) + this.stats.size,
                    y: Math.random() * (this.mapHeight - this.stats.size) + this.stats.size,
                }
                break;
            case "dev":
            case "test":
                this.position = {
                    x: 400,
                    y: 400,
                }
                break;
        }

        this.stats.healt = this.baseStats.healt;

    }

    Up() {

        if (this.position.y - this.stats.speed > this.stats.size)
            this.position.y -= this.stats.speed;

    }
    Down() {

        if (this.position.y + this.stats.speed < this.mapHeight - this.stats.size * 2)
            this.position.y += this.stats.speed;

    }
    Left() {

        if (this.position.x - this.stats.speed > this.stats.size)
            this.position.x -= this.stats.speed;

    }
    Right() {

        if (this.position.x + this.stats.speed < this.mapWidth - this.stats.size * 2)
            this.position.x += this.stats.speed;

    }

    UpRight() {

        if (this.position.y - this.stats.speed > this.stats.size)
            this.position.y -= this.stats.speed / DIAGONAL_FACTOR;

        if (this.position.x + this.stats.speed < this.mapWidth - this.stats.size * 2)
            this.position.x += this.stats.speed / DIAGONAL_FACTOR;

    }
    RightDown() {

        if (this.position.x + this.stats.speed < this.mapWidth - this.stats.size * 2)
            this.position.x += this.stats.speed / DIAGONAL_FACTOR;

        if (this.position.y + this.stats.speed < this.mapHeight - this.stats.size * 2)
            this.position.y += this.stats.speed / DIAGONAL_FACTOR;

    }

    DownLeft() {

        if (this.position.y + this.stats.speed < this.mapHeight - this.stats.size * 2)
            this.position.y += this.stats.speed / DIAGONAL_FACTOR;

        if (this.position.x - this.stats.speed > this.stats.size)
            this.position.x -= this.stats.speed / DIAGONAL_FACTOR;

    }
    UpLeft() {

        if (this.position.y - this.stats.speed > this.stats.size)
            this.position.y -= this.stats.speed / DIAGONAL_FACTOR;

        if (this.position.x - this.stats.speed > this.stats.size)
            this.position.x -= this.stats.speed / DIAGONAL_FACTOR;

    }

    userName(nick) {

        this.KDA.userName = nick;

    }

}