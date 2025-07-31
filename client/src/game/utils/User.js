class User {

    constructor() {
        this.pov = { width: 1920, height: 925 };
        this.movement = { KeyW: false, KeyA: false, KeyS: false, KeyD: false, direction: "" }
        this.combat = { isShooting: false, fireRate: null, Muzzle_Direction: { x: window.innerWidth, y: window.innerHeight / 2 }, angle: null };
    }

    clear() {
        this.movement.KeyW = false;
        this.movement.KeyA = false;
        this.movement.KeyS = false;
        this.movement.KeyD = false;
        this.movement.direction = "";

        this.combat.isShooting = false;
        this.combat.Muzzle_Direction = { x: window.innerWidth, y: window.innerHeight / 2 }
        this.combat.angle = null;
    }

}

const user = new User();

export default user;