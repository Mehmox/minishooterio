export default class SnapshotNode {

    constructor() {
        this.prev = null;
        this.next = null;
    }

    refresh(next) {
        this.prev = this.next;
        this.next = next;
    }

    clear() {
        this.prev = null;
        this.next = null;
    }

}