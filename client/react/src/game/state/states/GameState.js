export default class GameState {

    constructor(root) {

        this.root = root;
        this.prev = new Map();
        this.next = new Map();

    }

    clear() {
        
        this.prev.clear();
        this.next.clear();

    }
}