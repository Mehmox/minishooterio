export default class Player {

    clear() {

        this.isActive = false;
        this.inVision.clear();
        this.kill();

    }

    kill() {

        this.x = -5000;
        this.y = -5000;

    }

    constructor(i, size) {

        //constants
        this.id = i;
        this.size = size;

        //varibles
        this.isActive = false;
        this.nick = undefined;

        //changing continuously
        this.x = -5000;
        this.y = -5000;
        this.inVision = new Set();
        this.angle = undefined;

    }

}