import decoder from "./decoder";
import applyDelta from "./applyDelta";

class SnapshotManager {

    update(snapshot) {
        // return
        const Delta = decoder(snapshot);

        for (const porperty in Delta[0]) {
            console.log(`"${porperty}": `, Delta[0][porperty])
        }
        console.log("\n")
        return;
        // applyDelta(Delta,)

    }

}

export default new SnapshotManager();