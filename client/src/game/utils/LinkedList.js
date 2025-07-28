class SnapshotNode {

    constructor() {
        this.prev = null;
        this.next = null;
    }

    update(newdata) {
        if (this.next) this.prev = this.next;
        else this.next = newdata;
    }

    clear() {
        this.prev = null;
        this.next = null;
    }

}

export default new SnapshotNode();