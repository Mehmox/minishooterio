import Log from "../../../../shared/Log.js";

const systemStatus = {
    moveBullets: true,
    movePlayers: true,
    fire: true,
    damage: true,
    updateAOI: true,
    SnapshotManager: true,
}

export default function SafeExecute(label, fn) {
    if (!systemStatus[label]) return;

    try {
        fn();
    } catch (error) {
        systemStatus[label] = false;
        Log(`"${label}" down!\n`);
        console.log(error);
    }

}