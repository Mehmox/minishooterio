import decoder from "./decoder";
import applyDelta from "./applyDelta";

class SnapshotManager {

    update(next, snapshot) {

        const Delta = decoder(snapshot);

        applyDelta(Delta, next)

    }

}

export default new SnapshotManager();