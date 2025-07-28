const systemStatus = {
    moveBullets: true,
    movePlayers: true,
    fire: true,
    damage: true,
    updateAOI: true,
    SnapshotManager: true,
}

module.exports = function SafeExecute(label, fn) {
    if (!systemStatus[label]) return;

    try {
        fn();
    } catch (error) {
        systemStatus[label] = false;
        console.log(`"${label}" down!`);
        console.log(error);
    }

}