export default class SnapshotState {

    constructor(root) {

        this.root = root;
        this.clear()

    }

    clear() {

        this.prev = {};
        this.next = {};

    }

}