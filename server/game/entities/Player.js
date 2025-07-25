module.exports = class Player {

    setNick(nick, socket_id) {

        this.nick = nick;
        this.socket_id = socket_id;

    }

    clear() {

        this.kill();
        this.KDA = { kill: 0, dead: 0, assist: 0 };

    }

    kill() {

        this.health = this.maxhealth;
        this.enemyInfo.clear();
        this.bulletInfo.clear();
        this.cooldown = 0;
        this.Muzzle_SERVER_X = undefined;
        this.Muzzle_SERVER_Y = undefined;
        this.direction = "";

    }

    constructor(Game_settings, i, Tick) {

        //constants
        this.id = i;
        this.speed = Game_settings.new.player.speed / Tick * 60;
        this.crossspeed = this.speed / Math.sqrt(2);
        this.size = Game_settings.new.player.size;
        this.fireRate = Game_settings.new.player.fireRate;
        this.maxhealth = Game_settings.new.player.health;

        //varibles
        this.nick = undefined;
        this.socket_id = undefined;

        //changing continuously
        this.KDA = { kill: 0, dead: 0, assist: 0 };
        this.x = -5000;
        this.y = -5000;
        this.health = this.maxhealth;
        this.enemyInfo = new Set();
        this.enemyInfo.add(3)//test
        this.bulletInfo = new Set();
        this.isShooting = false;
        this.cooldown = 0;
        this.Muzzle_SERVER_X = undefined;
        this.Muzzle_SERVER_Y = undefined;
        this.direction = "";

    }

}