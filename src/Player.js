//players.js
module.exports = class Player {
    constructor(id, mapWidth, mapHeight) {
        this.player = id;
        this.size = 20
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.x = Math.random() * (mapWidth - this.size);
        this.y = Math.random() * (mapHeight - this.size);
        this.speed = 5;
        this.direction = "";
    }
    Up() {
        if (this.y - this.speed > 0 + this.size)
            this.y -= this.speed;
    }
    Down() {
        if (this.y + this.speed < this.mapHeight - this.size)
            this.y += this.speed;
    }
    Left() {
        if (this.x - this.speed > 0 + this.size)
            this.x -= this.speed;
    }
    Right() {
        if (this.x + this.speed < this.mapWidth - this.size)
            this.x += this.speed;
    }

    UpRight() {
        if (this.y - this.speed > 0 + this.size)
            this.y -= this.speed / Math.sqrt(2);
        if (this.x + this.speed < this.mapWidth - this.size)
            this.x += this.speed / Math.sqrt(2);
    }
    RightDown() {
        if (this.x + this.speed < this.mapWidth - this.size)
            this.x += this.speed / Math.sqrt(2);
        if (this.y + this.speed < this.mapHeight - this.size)
            this.y += this.speed / Math.sqrt(2);
    }

    DownLeft() {
        if (this.y + this.speed < this.mapHeight - this.size)
            this.y += this.speed / Math.sqrt(2);
        if (this.x - this.speed > 0 + this.size)
            this.x -= this.speed / Math.sqrt(2);
    }

    UpLeft() {
        if (this.y - this.speed > 0 + this.size)
            this.y -= this.speed / Math.sqrt(2);
        if (this.x - this.speed > 0 + this.size)
            this.x -= this.speed / Math.sqrt(2);
    }

    fire() {

    }
}