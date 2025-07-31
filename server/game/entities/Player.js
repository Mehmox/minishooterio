module.exports = class Player {

    setNick(nick, socket_id) {

        this.nick = nick;
        this.socket_id = socket_id;

    }

    clear() {

        this.KDA = { kill: 0, dead: 0, assist: 0 };
        this.dead();

    }

    dead() {

        this.health = this.maxhealth;
        this.seenEnemys.clear();
        this.seenBy.clear();
        this.seenBullets.clear();
        this.cooldown = 0;
        this.Muzzle_SERVER_X = undefined;
        this.Muzzle_SERVER_Y = undefined;
        this.direction = "";

    }

    constructor(game_settings, i, Tick) {

        //constants
        this.id = i;
        this.speed = game_settings.player.speed / Tick * 60;
        this.crossspeed = this.speed / Math.sqrt(2);
        this.size = game_settings.player.size;
        this.fireRate = game_settings.player.fireRate;
        this.maxhealth = game_settings.player.health;

        //varibles
        this.nick = undefined;
        this.socket_id = undefined;

        //changing continuously
        this.KDA = { kill: 0, dead: 0, assist: 0 };
        this.x = -5000;
        this.y = -5000;
        this.health = this.maxhealth;
        this.seenEnemys = new Set();
        this.seenBy = new Set();
        this.seenBullets = new Set();
        this.isShooting = false;
        this.cooldown = 0;
        this.Muzzle_SERVER_X = undefined;
        this.Muzzle_SERVER_Y = undefined;
        this.direction = "";

    }

}