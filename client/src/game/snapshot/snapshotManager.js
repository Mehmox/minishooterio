import decoder from "./decoder";
import applyDelta from "./applyDelta";

class SnapshotManager {

    update(next, snapshot) {

        const Delta = decoder(snapshot);
        console.log(next);
        applyDelta(next, Delta);

    }

}

export default new SnapshotManager();