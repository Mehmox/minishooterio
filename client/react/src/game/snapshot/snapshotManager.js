import StateManager from "../state/StateManager.js";
import decoder from "./decoder";
import applyDelta from "./applyDelta";

class SnapshotManager {

    on(newsnapshot) {

        StateManager.snapshot.prev = StateManager.snapshot.next;

        StateManager.snapshot.next = decoder(newsnapshot);

        applyDelta(StateManager.game, StateManager.snapshot);

    }

    emit() {

    }

}

const manager = new SnapshotManager();

export default manager;