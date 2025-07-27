//players.js
const Bullet = require("./Bullet");

module.exports = class Player {
    constructor(self, Game, ENV) {
        this.self = self
        this.ENV = ENV
        switch (ENV) {
            case "pro":
                this.position = {
                    x: Math.random() * (Game.width - this.size),
                    y: Math.random() * (Game.height - this.size),
                }
                break;
            case "dev":
            case "test":
                this.position = {
                    x: 1000,
                    y: 1000,
                }
                break;
        }
        this.size = 20
        this.speed = 5;
        this.pov = {
            width: Game.pov.width,
            height: Game.pov.height
        }
        this.direction = "";

        this.mapWidth = Game.width;
        this.mapHeight = Game.height;


        this.bullets = [];
        this.fireRate = 1.5;
        this.cooldown = 0;

        this.enemieInfo = {}
        this.bulletInfo = {}

    }
    Up() {
        if (this.position.y - this.speed > this.size || this.ENV === "dev")
            this.position.y -= this.speed;
    }
    Down() {
        if (this.position.y + this.speed < this.mapHeight - this.size * 2 || this.ENV === "dev")
            this.position.y += this.speed;
    }
    Left() {
        if (this.position.x - this.speed > this.size || this.ENV === "dev")
            this.position.x -= this.speed;
    }
    Right() {
        if (this.position.x + this.speed < this.mapWidth - this.size * 2 || this.ENV === "dev")
            this.position.x += this.speed;
    }

    UpRight() {
        if (this.position.y - this.speed > this.size || this.ENV === "dev")
            this.position.y -= this.speed / Math.sqrt(2);
        if (this.position.x + this.speed < this.mapWidth - this.size * 2 || this.ENV === "dev")
            this.position.x += this.speed / Math.sqrt(2);
    }
    RightDown() {
        if (this.position.x + this.speed < this.mapWidth - this.size * 2 || this.ENV === "dev")
            this.position.x += this.speed / Math.sqrt(2);
        if (this.position.y + this.speed < this.mapHeight - this.size * 2 || this.ENV === "dev")
            this.position.y += this.speed / Math.sqrt(2);
    }

    DownLeft() {
        if (this.position.y + this.speed < this.mapHeight - this.size * 2 || this.ENV === "dev")
            this.position.y += this.speed / Math.sqrt(2);
        if (this.position.x - this.speed > this.size || this.ENV === "dev")
            this.position.x -= this.speed / Math.sqrt(2);
    }

    UpLeft() {
        if (this.position.y - this.speed > this.size || this.ENV === "dev")
            this.position.y -= this.speed / Math.sqrt(2);
        if (this.position.x - this.speed > this.size || this.ENV === "dev")
            this.position.x -= this.speed / Math.sqrt(2);
    }

    fire(target) {
        if (Date.now() >= this.cooldown) {
            this.cooldown = Date.now() + 1000 / this.fireRate;
            this.bullets.push(new Bullet(this, target))
        }
    }
}