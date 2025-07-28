export default class Bullet {

    setOwner(isowner) {

        this.isowner = isowner;
        this.isActive = true;

    }

    destroy() {

        this.isowner = undefined;
        this.isActive = false;
        this.x = -5000;
        this.y = -5000;

    }

    constructor(i, size) {

        //constants
        this.id = i;
        this.size = size;

        //varibles
        this.isActive = false;
        this.isowner = undefined;

        //changing continuously
        this.x = -5000;
        this.y = -5000;

    }

}