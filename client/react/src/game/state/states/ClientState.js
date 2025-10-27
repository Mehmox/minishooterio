export default class clientState {

    constructor(root) {
        
        this.root = root;
        this.clear();

    }

    clear() {

        this.KeyW = false;
        this.KeyA = false;
        this.KeyS = false;
        this.KeyD = false;
        this.direction = "";

        this.isShooting = false;
        this.Muzzle_Direction = { x: window.innerWidth, y: window.innerHeight / 2 }
        this.angle = null;

    }

}